const data = [
    {
        id: 1,
        type: 'car',
        brand: 'Audi',
        doors: 4,
        price: 4300000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/2020_Audi_e-Tron_Sport_50_Quattro.jpg/1200px-2020_Audi_e-Tron_Sport_50_Quattro.jpg'
    },
    {
        id: 2,
        type: 'car',
        brand: 'Mercedes-Benz',
        doors: 4,
        price: 2800000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/2019_Mercedes-Benz_E220d_SE_Automatic_2.0_Front.jpg/300px-2019_Mercedes-Benz_E220d_SE_Automatic_2.0_Front.jpg'
    },
    {
        id: 3,
        type: 'bike',
        brand: 'Harley-Davidson',
        maxSpeed: 210,
        price: 1300000,
        image: 'https://www.harley-davidson.com/content/dam/h-d/images/product-images/bikes/motorcycle/2022/2022-iron-883/2022-iron-883-016/2022-iron-883-016-motorcycle.jpg'
    },
    {
        id: 4,
        type: 'bike',
        brand: 'Harley-Davidson',
        maxSpeed: 220,
        price: 1400000,
        image: 'https://cdn.dealerspike.com/imglib/products/harley-showroom/2020/livewire/main/Vivid-Black-Main.png'
    }
];

class Transport {
    constructor(type, price, brand) {
        this.type = type;
        this.price = price;
        this.brand = brand;
    }

    getInfo() {
        return {
            type: this.type,
            brand: this.brand
        };
    }
    getPrice() {
        return this.price;
    }
}

class Car extends Transport {
    constructor(price, brand, doorsCount = 4) {
        super('car', price, brand);
        this.doorsCount = doorsCount;
    }
    getDoorsCount() {
        return this.doorsCount;
    }
}

class Bike extends Transport {
    constructor(price, brand, maxSpeed = 200) {
        super('bike', price, brand);
        this.maxSpeed = maxSpeed;
    }
    getMaxSpeed() {
        return this.maxSpeed;
    }
}

class DataFetcher {
    fetchTransport() {
        return data.map(({
            type,
            brand,
            price,
            ...rest
        }) => {
            if (type === 'car') {
                return new Car(price, brand, rest.doors);
            }

            return new Bike(price, brand, rest.maxSpeed);
        });
    }
}

function listView() {
    const dataFetcher = new DataFetcher();
    const vehicles = dataFetcher.fetchTransport();

    const list = document.createElement('ul');
    list.className = 'list-view';

    return vehicles.reduce((acc, item) => {
        const el = document.createElement('li');
        el.className = 'el-view';
        
        const { brand, type } = item.getInfo();

        if (type === 'car') {
            el.innerText = `Transport: "${type}";
            Brand: "${brand}";
            Price: ${item.getPrice().toLocaleString('ru-RU')} ru;
            Doors: ${item.getDoorsCount()}.
            `;
        } else if (type === 'bike') {
            el.innerText = `Transport: "${type}";
            Brand: "${brand}";
            Price: ${item.getPrice().toLocaleString('ru-RU')} ru;
            Max speed: ${item.getMaxSpeed()} km/h.
            `;
        }

        acc.appendChild(el);

        return acc;
    }, list);
}

document.body.appendChild(listView());