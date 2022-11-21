/* eslint-disable prettier/prettier */
export const stockQuery = `
SELECT
    mechanic.product.id AS productId,
    mechanic.product.merchantId AS merchantId,
    mechanic.product.name AS name,
    (
    SELECT
        IF(
            SUM(
                mechanic.purchase.purchase_quantity
            ) IS NULL,
            0,
            SUM(
                mechanic.purchase.purchase_quantity
            )
        )
    FROM
        mechanic.purchase
    WHERE
        mechanic.purchase.productId = mechanic.product.id
) AS Reciepts,

IF(
    SUM(odtp.quantity_used) IS NULL,
    0,
    SUM(odtp.quantity_used)
) AS sales,

(
    SELECT
        IF(
            SUM(
                mechanic.purchase.purchase_quantity
            ) IS NULL,
            0,
            SUM(
                mechanic.purchase.purchase_quantity
            )
        )
    FROM
        mechanic.purchase
    WHERE
        mechanic.purchase.productId = mechanic.product.id
) - IF(
    SUM(odtp.quantity_used) IS NULL,
    0,
    SUM(odtp.quantity_used)
) AS inStock

FROM
    (
        mechanic.product
    LEFT JOIN mechanic.order_detail_to_product odtp
    ON
        (
            odtp.productId = mechanic.product.id
        )
    )

GROUP BY
    mechanic.product.id
`;

export const queryStockByMerchant = (merchantId) => {
  return `
  SELECT * FROM stock_by_merchant WHERE merchantId = ${merchantId}
  `;
};
