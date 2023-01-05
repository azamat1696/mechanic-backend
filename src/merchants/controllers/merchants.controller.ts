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
import { Express, response } from 'express';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

// Pdf
import { compileTemplate } from '../.././utils/helpers';
// import puppeteer from 'puppeteer';

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
import { JobService } from '../../job/services/jobs.service';
import { JobDetailService } from '../../job-detail/services/job-detail.service';

// Events
import { OrderCreatedEvent } from '../events/orderCreated.event';

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
import { PurchaseIdDto } from '../dto/purchases/purchaseId.dto';

// Orders
import { CreateOrderDto } from '../dto/orders/CreateOrder.dto';
import { UpdateOrderDto } from '../dto/orders/UpdateOrder.dto';
import { OrderDetailByOrder } from '../dto/orderDetail/orderDetailByOrder.dto';
import { OrderIdDto } from '../dto/orders/orderId.dto';

// OrderDetail
import { DeleteOrderDetail } from '../dto/orderDetail/deleteOrderDetail.dto';
import { UpdateOrderDetail } from '../dto/orderDetail/updateOrderDetail.dto';
import { UpdatedProducts } from '../dto/orderDetail/updatedProducts.dto';

// PurchaseOrderDetail
import { UpdatePurchaseOrderDetail } from '../dto/purchaseDetail/purchaseDetail.dto';

// Jobs
import { CreateJobDto } from '../dto/jobs/createJob.dto';

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
    private readonly jobService: JobService,
    private readonly jobDetailService: JobDetailService,
    private eventEmitter: EventEmitter2,
    private dataSource: DataSource
  ) {}

  @Get()
  getUsers() {
    return this.merchantsService.findAll();
  }

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
    // console.log('stockView', stockView);

    return stockView;
  }

  /*
  __________
  STOCK VIEW
  ----------
  */

  @Post('register')
  @UsePipes(ValidationPipe)
  createMerchant(@Body() createMerchantsDto: CreateMerchantsDto) {
    console.log('Password', createMerchantsDto.password);
    return this.merchantsService.add(createMerchantsDto);
  }

  @Put(':id')
  updateMerchant(
    @Param('id') id: number,
    @Body() updateMerchantDto: UpdateMerchantsDto
  ) {
    return this.merchantsService.update(id, updateMerchantDto);
  }

  @Delete(':id')
  deleteMerchant(@Param('id') id: number) {
    return this.merchantsService.remove(id);
  }

  /*
  __________
  PRODUCTS
  ----------
  */

  @Post('create-product')
  @UsePipes(ValidationPipe)
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
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Response() res: any
  ) {
    const { email } = req.user;
    const { supplierId } = createProductDto;

    console.log('createProduct', createProductDto);

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
      return res.json({ CreatedProduct: [savedProduct] });
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
    @Response() res: any
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
    return res.json({ UpdatedProduct: [updatedProduct] });
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

  @Get('products')
  @UseGuards(JwtAuthGuard)
  async productsByMerchant(@Request() req, @Response() res) {
    const { email } = req.user;
    console.log('email', email);
    const foundMerchant = await this.merchantsService.findByEmail(email);

    if (foundMerchant) {
      const productsByMerch = await this.productsService.getProductsByMerch(
        foundMerchant
      );
      res.json({ productsByMerch });
    }
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
    // console.log('email', email);
    const foundMerchant = await this.merchantsService.findByEmail(email);
    // console.log('foundMerchant', foundMerchant);
    let foundOrders;
    let foundOrderDetails;

    if (foundMerchant) {
      const { id } = foundMerchant;
      console.log('id', id);
      foundOrders = await this.orderService.findByMerchant(id);
      // console.log('foundOrders', foundOrders);

      if (foundOrders) {
        foundOrders.forEach(async (order) => {
          const { id } = order;
          foundOrderDetails = await this.orderDetailService.findByOrderId(id);
          // console.log('foundOrderDetails', foundOrderDetails);
          return foundOrderDetails;
        });
      }
    }

    res.json({ foundOrders, foundOrderDetails });
  }

  @Post('create-order')
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req,
    @Response() res
  ) {
    const { email } = req.user;
    const { customerId } = createOrderDto;

    const merchant = await this.merchantsService.findByEmail(email);
    const user = await this.usersService.findOne(customerId);

    console.log('createOrderDto', createOrderDto);

    if (merchant && user) {
      const createdOrder = await this.orderService.create(
        merchant,
        user,
        createOrderDto
      );

      if (createdOrder) {
        const { products } = createOrderDto;
        products.forEach(async (p): Promise<any> => {
          const { productId, quantity, price } = p;
          const foundProduct = await this.productsService.findOne(productId);
          if (foundProduct) {
            await this.orderDetailService.add(
              createdOrder,
              foundProduct,
              quantity,
              price
            );
          }
        });
      }
    }
    res.json({ createOrderDto });
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
    // console.log('updateOrderDto', updateOrderDto);
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
  ____________
  ORDER DETAIL
  ____________
  */

  @Post('order-detail')
  @UseGuards(JwtAuthGuard)
  async getOrderDetailByOrder(
    @Request() req,
    @Response() res,
    @Body() orderDetailByOrder: OrderDetailByOrder
  ) {
    // console.log('req.body', req.body.email);
    // console.log('orderDetailByOrder', orderDetailByOrder);
    const { orderId } = orderDetailByOrder;
    const orderDetail = await this.orderDetailService.findByOrderId(orderId);
    res.json({ orderDetail });
  }

  @Post('delete-order-detail')
  @UseGuards(JwtAuthGuard)
  async deleteOrderDetail(
    @Request() req,
    @Response() res,
    @Body() deleteOrderDetail: DeleteOrderDetail
  ) {
    console.log('deleteOrderDetail', deleteOrderDetail);
    const { id } = deleteOrderDetail;
    const deleted = await this.orderDetailService.remove(id);
    res.status(200).json({ deleted });
  }

  @Post('update-order-detail')
  @UseGuards(JwtAuthGuard)
  // @UsePipes(ValidationPipe)
  async updateOrderDetail(
    @Request() req,
    @Response() res,
    @Body() updateOrderDetail: UpdateOrderDetail
    // @Body() orderIdDto: OrderIdDto
  ) {
    console.log('updateOrderDetail ~~~~', updateOrderDetail);
    // console.log('orderIdDto', orderIdDto);
    const { orderId: id, status } = updateOrderDetail;
    console.log('id', id);

    const newUpdates = { id, status };
    console.log('newUpdates', newUpdates);

    try {
      const updatedOrder = await this.orderService.update(id, newUpdates);
    } catch (err) {
      console.log('err', err);
    }

    // if (updatedOrder) {
    //   const updated = this.orderDetailService.update(updateOrderDetail);
    // }

    // res.json({ finished: 'fin' });
  }

  /*
  ____________
  ORDER DETAIL
  ____________
  */

  /*
  _________
  SUPPLIERS
  ---------
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
  _________
  SUPPLIERS
  ---------
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
          console.log('p', p);
          const { productId, quantity } = p;
          const foundProduct = await this.productsService.findOne(productId);
          if (foundProduct) {
            const createdPD = await this.purchaseDetailService.add(
              foundOrder,
              foundProduct,
              quantity
            );

            // Order Cretaed Event
            const orderCreatedEvent = new OrderCreatedEvent();
            console.log('orderCreatedEvent', orderCreatedEvent);
            orderCreatedEvent.supplierId = foundOrder.supplierId;
            console.log('orderCreatedEvent', orderCreatedEvent);
            const emitting = this.eventEmitter.emit(
              'order.created',
              orderCreatedEvent
            );
            console.log('emitting', emitting);
            // Order Cretaed Event
            this.eventEmitter.on(
              'order.created',
              function () {
                console.log('The event was raised!');
              },
              { async: true }
            );

            return createdPD;
          }
        });
      }
    }

    return res.json({ orderCreated: true });
  }

  @OnEvent('order.created', { async: true })
  handleOrderCreatedEvent(event: OrderCreatedEvent, @Response() res) {
    console.log('Your Order has been successfully created!', event);
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
        return res.json({ orders });
      }
    }
  }

  @Post('delete-purchase-order')
  @UseGuards(JwtAuthGuard)
  async deletePurchaseOrder(@Request() req) {
    console.log('req.body', req.body.id);
    const { id } = req.body;
    await this.purchaseService.remove(id);
  }

  /*
  _______________
  PURCHASE ORDERS
  _______________
  */

  /*
  _____________________
  PURCHASE ORDER DETAIL
  _____________________
  */

  @Post('update-purchase-order-detail')
  @UseGuards(JwtAuthGuard)
  async updatePurchaseOrderDetail(
    @Request() req: any,
    @Response() res: any,
    @Body() updatePurchaseOrderDetail: UpdatePurchaseOrderDetail
  ) {
    console.log('updatePurchaseOrderDetail', updatePurchaseOrderDetail);

    // Update Existing Purchase Order Detail

    await this.purchaseDetailService.update(updatePurchaseOrderDetail);

    // Create New Purchase Order Detail
    res.json({ updatePurchaseOrderDetail });
  }

  /*
  _____________________
  PURCHASE ORDER DETAIL
  _____________________
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
    try {
      console.log('~~~~', updateUsersDto);
      const { id } = updateUsersDto;
      const foundUser = await this.usersService.update(id, updateUsersDto);

      if (foundUser) {
        return res.json(foundUser);
      }
    } catch (err) {
      console.log('err', err);
      // throw new HttpException("some error", HttpStatus.BAD_REQUEST)
    }
  }

  /*
  _________
  CUSTOMERS
  _________
  */

  /*
  ______________
  PURCHASE ORDER
  ______________
  */

  // @Post('purchase-order')
  // @UseGuards(JwtAuthGuard)
  // async root(
  //   @Request() req: any,
  //   @Response() res: any,
  //   @Body() purchaseIdDto: PurchaseIdDto
  // ) {
  //   const { email } = req.user;
  //   const merchant = await this.merchantsService.findByEmail(email);
  //   const { orderId } = purchaseIdDto;

  //   if (merchant) {
  //     const { id } = merchant;
  //     const orders = await this.purchaseService.getMerchantOrders(id);

  //     if (orders) {
  //       const foundOrder = orders.find((o: any) => o.id === orderId);
  //       const pds = await this.purchaseDetailService.findPurchaseDetailByOrder(
  //         orderId
  //       );

  //       const totalPrice = pds
  //         .map((item) => item.quantity * item.product.retailPrice)
  //         .reduce((acc, curr) => acc + curr);

  //       const browser = await puppeteer.launch();
  //       const page = await browser.newPage();
  //       const content = await compileTemplate('purchase-order');

  //       if (content) {
  //         await page.setContent(
  //           content({ order: foundOrder, items: pds, total: totalPrice })
  //         );
  //         const pdf = await page.pdf();
  //         return res.end(pdf);
  //       }
  //     }
  //   }
  // }

  /*
  ______________
  PURCHASE ORDER
  ______________
  */

  /*
  _______
  INVOICE
  _______
  */

  // @Post('invoice')
  // @UseGuards(JwtAuthGuard)
  // async getInvoice(
  //   @Request() req: any,
  //   @Response() res: any,
  //   @Body() orderIdDto: OrderIdDto
  // ) {
  //   const { email } = req.user;
  //   const merchant = await this.merchantsService.findByEmail(email);
  //   const { orderId } = orderIdDto;

  //   if (merchant) {
  //     const order = await this.orderService.findOne(orderId);
  //     console.log('order', order);

  //     const orderDetail = await this.orderDetailService.findByOrderId(orderId);
  //     console.log('orderDetail', orderDetail);

  //     if (order && orderDetail) {
  //       const totalPrice = orderDetail
  //         .map((item) => item.quantity * item.product.retailPrice)
  //         .reduce((acc, curr) => acc + curr);
  //       const browser = await puppeteer.launch();
  //       const page = await browser.newPage();
  //       const content = await compileTemplate('invoice');
  //       if (content) {
  //         await page.setContent(
  //           content({
  //             order: order,
  //             orderDetail: orderDetail,
  //             totalPrice: totalPrice,
  //           })
  //         );
  //         const pdf = await page.pdf();
  //         return res.end(pdf);
  //       }
  //     }
  //   }
  // }

  /*
  _______
  INVOICE
  _______
  */
}
