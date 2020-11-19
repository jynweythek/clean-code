module.exports = class Order {
    getPriceOfAvailableProducts() {
        this.setAvailableProducts();
        return this.getOrderPrice();
    }

    filterAvailableProducts(products) {
        return products.filter(product => {return product.isAvailable});
    }

    getAvailableProducts() {
        return this.filterAvailableProducts(this.getProducts());
    }

    setAvailableProducts() {
        const availableProducts = this.getAvailableProducts();
        this.setProducts(availableProducts);
    }

    getOrderPrice() {
        let products = this.getAvailableProducts();

        return products.reduce((price, product) => {
            return price + product.productPrice;
        }, 0)
    }

    setProducts(products) {
        this.products = products;
    }

    getProducts() {
        return this.products;
    }
};
