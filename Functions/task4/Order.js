module.exports = class Order {
    getPriceOfAvailableProducts() {
        let orderPrice = 0;
        const availableProducts;

        this.products.forEach((product, index) => {
            if (!product.isAvailable) {
                this.products.splice(index, 1);
            }
        });
        for (const product of this.products) {
            orderPrice += product.productPrice;
        }
        return orderPrice;
    }



    setProducts(products) {
        this.products = products;
    }

    getProducts(products) {
        return this.products;
    }
};
