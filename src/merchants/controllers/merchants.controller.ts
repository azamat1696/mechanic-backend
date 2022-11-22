/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Response,
  Body,
  UsePipes,
  ValidationPipe,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';

// Event Emitter
import { MinimumStockEvent } from '../event-emitter/event-emitter';

// Services
import { MerchantsService } from '../services/merchants.service';
import { ProductService } from '../../products/services/product.service';
import { OrderService } from '../../order/services/order.service';
import { OrderDetailService } from '../../order-detail/services/order-detail.service';
import { SupplierService } from '../../suppliers/services/suppliers.service';
import { PurchaseService } from '../../purchases/services/purchases.service';
import { UsersService } from '../../users/services/users.service';
import { PurchaseDetailService } from '../../purchase-detail/services/purchase-detail.service';

// DTOs
// Merchants
import { UpdateMerchantsDto } from '../dto/merchants/update-merchant.dto';
import { CreateMerchantsDto } from '../dto/merchants/create-merchant.dto';
import { CreateProductDto } from '../dto/merchants/createProduct.dto';
import { DeleteCustomerDto } from '../dto/merchants/deleteCustomer';
import { GetMerchantDto } from '../dto/merchants/getMerchant.dto';

// Suppliers
import { CreateSupplierDto } from '../dto/suppliers/create.dto';
import { DeleteSupplierDto } from '../dto/suppliers/delete.dto';
import { UpdateSupplierDto } from '../dto/suppliers/update.dto';
import { ProductsBySupplierDto } from '../dto/products/productsBySupplier.dto';

// Users
import { CreateUsersDto } from '../dto/users/create.dto';
import { UpdateUsersDto } from '../dto/users/update.dto';

// Products
import { FindProductDto } from '../dto/products/FindProduct.dto';
import { UpdateProductDto } from '../dto/products/UpdateProduct.dto';
import { DeleteProductDto } from '../dto/products/deleteSingleProduct';

// Purchases
import { CreatePurchaseOrderDto } from '../dto/purchases/create.dto';

// Orders
import { CreateOrderDto } from '../dto/orders/create.dto';
import { UpdateOrderDto } from '../dto/orders/UpdateOrder.dto';
// Guards
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

// Queries
import { queryStockByMerchant } from '../../db/queries/queries';

// External
import { extname } from 'path';
import { diskStorage } from 'multer';
import { basename } from 'path';

interface Products {
  productId: number;
  quantity: number;
}

@Controller('merchants')
export class MerchantsController {
  constructor(
    private readonly merchantsService: MerchantsService,
    private readonly productsService: ProductService,
    private readonly orderService: OrderService,
    private readonly orderDetailService: OrderDetailService,
    private readonly suppliersService: SupplierService,
    private readonly purchaseService: PurchaseService,
    private readonly usersService: UsersService,
    private readonly purchaseDetailService: PurchaseDetailService,
    private eventEmitter: EventEmitter2,
    private dataSource: DataSource
  ) {}

  // Get all merchants
  @Get()
  getUsers() {
    return this.merchantsService.findAll();
  }
  // Get all merchants

  // List products by merchant
  @Get('list-products')
  @UseGuards(JwtAuthGuard)
  async findMerchProducts(@Request() req, @Response() res) {
    const merchant = await this.merchantsService.findByEmail(req.user.email);
    const products = await this.productsService.getProductsByMerch(merchant);
    res.json({ products });
  }

  /*
  __________
  STOCK VIEW
  ----------
  */

  @Post('stock')
  @UseGuards(JwtAuthGuard)
  async getData(@Body() getMerchantDto: GetMerchantDto) {
    // Emit Low Stock Event
    this.eventEmitter.emit('min.reached', new MinimumStockEvent());
    // Emit Low Stock Event
    const { merchantId: mId } = getMerchantDto;
    const stockView = await this.dataSource.query(
      queryStockByMerchant(Number(mId))
    );
    console.log('stockView', stockView);

    return stockView;
  }

  /*
  __________
  STOCK VIEW
  ----------
  */

  // Create merchant
  @Post('register')
  @UsePipes(ValidationPipe)
  createMerchant(@Body() createMerchantsDto: CreateMerchantsDto) {
    console.log('Password', createMerchantsDto.password);
    return this.merchantsService.add(createMerchantsDto);
  }
  // Create merchant

  // Update merchant
  @Put(':id')
  updateMerchant(
    @Param('id') id: number,
    @Body() updateMerchantDto: UpdateMerchantsDto
  ) {
    return this.merchantsService.update(id, updateMerchantDto);
  }
  // Update merchant

  // Delete merchant
  @Delete(':id')
  deleteMerchant(@Param('id') id: number) {
    return this.merchantsService.remove(id);
  }
  // Delete merchant

  /*
  __________
  PRODUCTS
  ----------
  */

  @Post('create-product')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './public/images',
        filename: function (req, image, cb) {
          const ext = extname(image.originalname);
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, image.fieldname + '-' + uniqueSuffix + ext);
        },
      }),
    })
  )
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Response() response: any
  ) {
    const { email } = req.user;
    const { supplierId } = createProductDto;

    const foundMerchant = await this.merchantsService.findByEmail(email);
    const foundSupplier = await this.suppliersService.findOne(supplierId);

    if (foundMerchant && foundSupplier) {
      const image =
        `http://localhost:8000/public/` +
        basename('images') +
        `/${file.filename}`;

      const savedProduct = await this.productsService.add(
        foundMerchant,
        foundSupplier,
        {
          ...createProductDto,
          image,
        }
      );
      return response.json({ CreatedProduct: [savedProduct] });
    } else {
      return 'merchant not found';
    }
  }

  @Post('update-product')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/images',
        filename: function (req, image, cb) {
          const ext = extname(image.originalname);
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, image.fieldname + '-' + uniqueSuffix + ext);
        },
      }),
    })
  )
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Response() response: any
  ) {
    console.log('req.body', req.body);
    console.log('updateProductDto', updateProductDto);
    console.log('file', file);
    const { id } = updateProductDto;

    let updatedProduct: any;

    console.log('updateProductDto', updateProductDto);

    if (file) {
      updatedProduct = await this.productsService.update(id, {
        ...updateProductDto,
        image:
          `http://localhost:8000/public/` +
          basename('images') +
          `/${file.filename}`,
      });
    } else {
      updatedProduct = await this.productsService.update(id, {
        ...updateProductDto,
      });
    }
    response.json({ UpdatedProduct: [updatedProduct] });
  }

  @Post('delete-single-product')
  @UseGuards(JwtAuthGuard)
  async deleteSingleProduct(@Body() deleteProductDto: DeleteProductDto) {
    const { productId } = deleteProductDto;
    return this.productsService.remove(Number(productId));
  }

  @Get('find-products')
  async findProducts() {
    return await this.productsService.findAll();
  }

  @Post('products-supplier')
  @UseGuards(JwtAuthGuard)
  async getProductsBySupplier(
    @Body() productsBySupplierDto: ProductsBySupplierDto,
    @Response() res
  ) {
    const { supplierId } = productsBySupplierDto;
    const suppliers = await this.productsService.getProductsBySupplier(
      supplierId
    );

    if (suppliers) {
      return res.json(suppliers);
    }
  }

  /*
  __________
  PRODUCTS
  ----------
  */

  /*
  __________
  ORDERS
  ----------
  */

  @Get('view-orders')
  @UseGuards(JwtAuthGuard)
  async getOrdersByMerchant(@Request() req, @Response() res) {
    const { email } = req.user;
    const foundMerchant = await this.merchantsService.findByEmail(email);

    if (foundMerchant) {
      const { id } = foundMerchant;
      const foundOrders = await this.orderService.findByMerchant(id);
      res.json({ foundOrders });
    }
  }

  @Post('create-order')
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req,
    @Response() res
  ) {
    const { email } = req.user;
    const foundMerchant = await this.merchantsService.findByEmail(email);
    const { userId } = createOrderDto;
    const foundUser = await this.usersService.findOne(userId);

    if (foundMerchant && foundUser) {
      const createdOrder = await this.orderService.create(
        foundMerchant,
        foundUser,
        createOrderDto
      );

      if (createdOrder) {
        const { products } = createOrderDto;
        products.forEach(async (p): Promise<any> => {
          const { productId, quantity, price } = p;
          const foundProduct = await this.productsService.findOne(productId);
          if (foundProduct) {
            const createdOD = await this.orderDetailService.add(
              createdOrder,
              foundProduct,
              quantity,
              price
            );
            return res.json({ createdOD });
          }
        });
      }
    }
  }

  @Post('delete-order')
  @UseGuards(JwtAuthGuard)
  async deleteOrder(@Request() req) {
    console.log('req.body', req.body.id);
    const { id } = req.body;
    return this.orderService.remove(id);
  }

  @Post('update-order')
  @UseGuards(JwtAuthGuard)
  async updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
    const { orderId } = updateOrderDto;
    const foundOrder = await this.orderService.findOne(orderId);
    const { id } = foundOrder;
    if (foundOrder) {
      return await this.orderService.update(id, updateOrderDto);
    }
  }
  /*
  __________
  ORDERS
  ----------
  */

  /*
  __________
  SUPPLIERS
  ----------
  */

  @Post('create-supplier')
  @UseGuards(JwtAuthGuard)
  async createSupplier(
    @Body() createSupplierDto: CreateSupplierDto,
    @Request() req: any
  ) {
    const { email } = req.user;
    const merchant = await this.merchantsService.findByEmail(email);
    if (merchant) {
      return this.suppliersService.create(createSupplierDto, merchant);
    }
  }

  @Get('suppliers')
  @UseGuards(JwtAuthGuard)
  async getSuppliersByMerchant(@Request() req: any, @Response() res: any) {
    const { email } = req.user;
    const merchant = await this.merchantsService.findByEmail(email);
    const { id } = merchant;
    if (merchant) {
      const cust = await this.suppliersService.findSuppliersByMerchant(id);
      return res.json(cust);
    }
  }

  @Post('delete-supplier')
  @UseGuards(JwtAuthGuard)
  async deleteSupplier(@Body() deleteSupplierDto: DeleteSupplierDto) {
    const { supplierId } = deleteSupplierDto;
    return await this.suppliersService.remove(supplierId);
  }

  @Post('update-supplier')
  @UseGuards(JwtAuthGuard)
  async updateSupplier(@Body() updateSupplierDto: UpdateSupplierDto) {
    return await this.suppliersService.update(updateSupplierDto);
  }

  /*
  __________
  SUPPLIERS
  ----------
  */

  /*
  _______________
  PURCHASE ORDERS
  _______________
  */

  @Post('create-purchase-order')
  @UseGuards(JwtAuthGuard)
  async createPurchaseOrder(
    @Body() createPurchaseOrderDto: CreatePurchaseOrderDto,
    @Request() req: any,
    @Response() res: any
  ) {
    const { products, supplierId } = createPurchaseOrderDto;
    const { email } = req.user;

    const foundMerchant = await this.merchantsService.findByEmail(email);
    const foundSupplier = await this.suppliersService.findOne(supplierId);

    if (foundMerchant && foundSupplier) {
      const createdOrder = await this.purchaseService.create(
        foundMerchant,
        foundSupplier
      );

      if (createdOrder) {
        const { id } = createdOrder;
        const foundOrder = await this.purchaseService.findOne(id);

        // Loop over each product
        products.forEach(async (p): Promise<Products> => {
          const { productId, quantity } = p;
          const foundProduct = await this.productsService.findOne(productId);
          if (foundProduct) {
            const createdPD = await this.purchaseDetailService.add(
              foundOrder,
              foundProduct,
              quantity
            );

            return createdPD;
          }
        });
      }
    }
  }

  // Get Purchase Orders by Merchant
  @Get('merchant-orders')
  @UseGuards(JwtAuthGuard)
  async getMerchantOrders(@Request() req: any, @Response() res: any) {
    const { email } = req.user;
    const merchant = await this.merchantsService.findByEmail(email);

    if (merchant) {
      const { id } = merchant;
      const orders = await this.purchaseService.getMerchantOrders(id);
      if (orders) {
        res.json({ orders });
      }
    }
  }

  /*
  _______________
  PURCHASE ORDERS
  _______________
  */

  // Get Single Product
  @Post('product')
  @UseGuards(JwtAuthGuard)
  async findProduct(@Body() findProductDto: FindProductDto, @Response() res) {
    const { productId } = findProductDto;
    const foundProduct = await this.productsService.findOne(productId);

    if (foundProduct) {
      return foundProduct;
    } else {
      return res.json({ message: 'nothing found!' });
    }
  }
  // Get Single Product

  /*
  _________
  CUSTOMERS
  _________
  */

  @Post('create-customer')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async createCustomerByMerchant(
    @Request() req: any,
    @Response() res: any,
    @Body() createUsersDto: CreateUsersDto
  ) {
    const { email } = req.user;
    const foundMerchant = await this.merchantsService.findByEmail(email);

    if (foundMerchant) {
      const createdUser = await this.usersService.add(
        createUsersDto,
        foundMerchant
      );
      if (createdUser) {
        return res.json(createdUser);
      }
    }
  }

  @Get('customers')
  @UseGuards(JwtAuthGuard)
  async getCustomersByMerchant(@Request() req: any, @Response() res: any) {
    const { email } = req.user;
    const merchant = await this.merchantsService.findByEmail(email);
    if (merchant) {
      const { id } = merchant;
      const customer = await this.usersService.findCustomersByMerchant(id);
      if (customer) {
        return res.json(customer);
      }
    }
  }

  @Post('delete-customer')
  @UseGuards(JwtAuthGuard)
  async deleteCustomerByMerchant(
    @Body() deleteCustomerDto: DeleteCustomerDto,
    @Response() res: any
  ) {
    const { customerId } = deleteCustomerDto;
    const deletedUser = await this.usersService.remove(customerId);
    if (deletedUser) {
      return res.json({ deletedUser });
    }
  }

  @Post('update-customer')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async updateCustomerByMerchant(
    @Response() res: any,
    @Body() updateUsersDto: UpdateUsersDto
  ) {
    const { id } = updateUsersDto;
    const foundUser = await this.usersService.update(id, updateUsersDto);
    if (foundUser) {
      return res.json(foundUser);
    }
  }

  /*
  _________
  CUSTOMERS
  _________
  */
}
