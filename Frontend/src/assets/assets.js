import main from './Main/main.jpg'
import M1 from './Main/M1.jpg'
import M2 from './Main/M2.jpg'
import M3 from './Main/M3.jpg'
import M4 from './Main/M4.jpg'
import M5 from './Main/M5.jpg'
import M6 from './Main/M6.jpg'
import M7 from './Main/M7.jpg'

import healthy from './Healthy/Healthy.jpg'
import H1 from './Healthy/H1.jpg'
import H2 from './Healthy/H2.jpg'
import H3 from './Healthy/H3.jpg'
import H4 from './Healthy/H4.jpg'
import H5 from './Healthy/H5.jpg'
import H6 from './Healthy/H6.jpg'

import drinks from './Drinks/Drinks.jpg'
import D1 from './Drinks/D1.jpg'
import D2 from './Drinks/D2.jpg'
import D3 from './Drinks/D3.jpg'
import D4 from './Drinks/D4.jpg'
import D5 from './Drinks/D5.jpg'
import D6 from './Drinks/D6.jpg'
import D7 from './Drinks/D7.jpg'

import dessert from './Dessert/Dessert.jpg'
import Des1 from './Dessert/Des1.jpg'
import Des2 from './Dessert/Des2.jpg'
import Des3 from './Dessert/Des3.jpg'
import Des4 from './Dessert/Des4.jpg'
import Des5 from './Dessert/Des5.jpg'
import Des6 from './Dessert/Des6.jpg'

import appitizer from './Appitizer/Appitizer.jpg'
import Ap1 from './Appitizer/Ap1.jpg'
import Ap2 from './Appitizer/Ap2.jpg'
import Ap3 from './Appitizer/Ap3.jpg'
import Ap4 from './Appitizer/Ap4.jpg'
import Ap5 from './Appitizer/Ap5.jpg'
import Ap6 from './Appitizer/Ap6.jpg'
import Ap7 from './Appitizer/Ap7.jpg'

export const assets = {
    
}
export const Main = {
    main,
    M1,M2,M3,M4,M5,M6,M7
}
export const Healthy = {
    healthy,
    H1,H2,H3,H4,H5,H6
}
export const Drinks = {
    drinks,
    D1,D2,D3,D4,D5,D6,D7
}
export const Dessert = {
    dessert,
    Des1,Des2,Des3,Des4,Des5,Des6
}
export const Appitizer = {
    appitizer,
    Ap1,Ap2,Ap3,Ap4,Ap5,Ap6,Ap7
}

export const menu_list = [
    {
        menu_name: "Main Dish",
        menu_image: M1
    },
    {
        menu_name: "Healthy",
        menu_image: H1
    },
    {
        menu_name: "Drinks",
        menu_image: D1
    },
    {
        menu_name: "Dessert",
        menu_image: Des1
    },
    {
        menu_name: "Appitizer",
        menu_image: Ap1
    }
]

export const Foods = [
    {
        _id: "1",
        name: "Beef Steak with Peppercorn Sauce",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 209,
        image: [M1],
        category: "MainDish",
        date: 1716634345448,
        recommend: true
    },      
    {
        _id: "2",
        name: "Creamy Mushroom Risotto",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 159,
        image: [M2],
        category: "MainDish",
        date: 1716634345448,
        recommend: true
    }
]
