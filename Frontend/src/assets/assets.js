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

import Home from './Picture/Home.jpg'
import Recommend from './Picture/Recommend.png'
import QuickBLogo from './Picture/QuickBlogo.png'
import menu from './Picture/menu.png'
import shoppingBag from './Picture/shoppingBag.png'
import bell from './Picture/bell.png'
import moon from './Picture/moon.png'
import sun from './Picture/sun.png'
import pan from './Picture/pan.png'
import fire from './Picture/fire.png'
import star from './Picture/star.png'
import minus from './Picture/minus.png'
import add from './Picture/add.png'
import left from './Picture/left.png'
import glass from './Picture/glass.png'
import bin from './Picture/bin.png'
import cart from './Picture/cart.png'

export const assets = {
    Home,QuickBLogo,menu,shoppingBag,glass,bin,
    bell,moon,sun,pan,fire,star,add,minus,left,cart
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
        menu_name: "Recommend",
        menu_image: Recommend,
        menu_main: Recommend
    },
    {
        menu_name: "MainDish",
        menu_image: M1,
        menu_main: main
    },
    {
        menu_name: "Healthy",
        menu_image: H1,
        menu_main: healthy
    },
    {
        menu_name: "Drinks",
        menu_image: D1,
        menu_main: drinks
    },
    {
        menu_name: "Dessert",
        menu_image: Des1,
        menu_main: dessert
    },
    {
        menu_name: "Appitizer",
        menu_image: Ap1,
        menu_main: appitizer
    }
]

export const foods_list = [
    {
        _id: "1",
        name: "Beef Steak with Peppercorn Sauce",
        description: "Juicy beef steak served with a rich, creamy, and slightly spicy peppercorn sauce, perfect with mashed potatoes or vegetables. ",
        price: 209,
        image: [M1],
        rate:4.5,
        time:[10,20], //Start and End
        Kcal:100,
        category: "MainDish",
        date: 1716634345448,
        recommend: true
    },
    {
        _id: "2",
        name: "Creamy Mushroom Risotto",
        description: "A rich and creamy Italian rice dish cooked with sautÃ©ed mushrooms, Parmesan cheese, and a hint of white wine for a savory flavor.",
        price: 209,
        image: [M2],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "MainDish",
        date: 1716634345448,
        recommend: true
    },
    {
        _id: "3",
        name: "Grilled Salmon with Lemon Butter Sauce",
        description: "Perfectly grilled salmon topped with a zesty, buttery lemon sauce for a refreshing and savory flavor.",
        price: 209,
        image: [M3],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "MainDish",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "4",
        name: "Pan-Seared Pork Chop with Apple Sauce",
        description: "Juicy pork chop seared to perfection, served with a sweet and tangy apple sauce.",
        price: 209,
        image: [M4],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "MainDish",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "5",
        name: "Roasted Chicken with Herb Stuffing",
        description: "Tender roasted chicken filled with a flavorful mix of herbs and bread stuffing.",
        price: 209,
        image: [M5],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "MainDish",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "6",
        name: "Seafood Paella",
        description: "A Spanish rice dish packed with saffron, shrimp, mussels, and other fresh seafood.",
        price: 209,
        image: [M6],
        rate:4.5,
        time:[10,20], 
        Kcal:100,
        category: "MainDish",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "7",
        name: "Spaghetti Carbonara",
        description: "Classic Italian pasta tossed with creamy egg sauce, crispy pancetta, and Parmesan cheese.",
        price: 209,
        image: [M7],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "MainDish",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "8",
        name: "Avocado Toast with Poached Egg ",
        description: "Creamy avocado spread on toasted bread, topped with a perfectly poached egg.",
        price: 209,
        image: [H1],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Healthy",
        date: 1716634345448,
        recommend: true
    },
    {
        _id: "9",
        name: "Chicken Lettuce Wraps",
        description: "Tender chicken with flavorful seasoning, wrapped in crisp lettuce leaves.",
        price: 209,
        image: [H2],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Healthy",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "10",
        name: "Kale Caesar Salad",
        description: "A healthier twist on the classic Caesar salad with fresh kale, croutons, and Parmesan cheese.",
        price: 209,
        image: [H3],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Healthy",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "11",
        name: "Salmon Salad with Citrus Dressing",
        description: "Fresh greens paired with grilled salmon and a tangy citrus vinaigrette.",
        price: 209,
        image: [H4],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Healthy",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "12",
        name: "Whole Wheat Pasta with Roasted Vegetables",
        description: "Nutty whole wheat pasta tossed with a mix of roasted seasonal vegetables.",
        price: 209,
        image: [H5],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Healthy",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "13",
        name: "Grilled Zucchini and Bell Pepper Wrap",
        description: "Smoky grilled zucchini and bell peppers wrapped in a soft tortilla or flatbread.",
        price: 209,
        image: [H6],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Healthy",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "14",
        name: "Fresh Coconut Water",
        description: " Naturally sweet and refreshing water served straight from a young coconut.",
        price: 209,
        image: [D1],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Drinks",
        date: 1716634345448,
        recommend: true
    },
    {
        _id: "15",
        name: "Iced Lemon Tea",
        description: "Chilled black tea with a zesty lemon twist, perfect for a hot day.",
        price: 209,
        image: [D2],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Drinks",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "16",
        name: "Thai Iced Tea",
        description: "Sweet and creamy tea made with Thai tea leaves, sugar, and condensed milk, served over ice.",
        price: 209,
        image: [D3],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Drinks",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "17",
        name: "Milkshake",
        description: "Creamy, blended drink made with milk, ice cream, and your choice of flavor like chocolate, vanilla, or strawberry.",
        price: 209,
        image: [D4],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Drinks",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "18",
        name: "Apple Juice",
        description: "Freshly squeezed or bottled juice with the natural sweetness of apples.",
        price: 209,
        image: [D5],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Drinks",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "19",
        name: "Orange Juice",
        description: "Refreshing juice made from freshly squeezed oranges, full of vitamin C.",
        price: 209,
        image: [D6],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Drinks",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "20",
        name: "Plain Water",
        description: "Pure and refreshing water to hydrate and cleanse the palate.",
        price: 209,
        image: [D7],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Drinks",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "21",
        name: "Banoffee Pie",
        description: "A sweet dessert with layers of bananas, toffee, whipped cream, and a biscuit crust.",
        price: 209,
        image: [Des1],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Dessert",
        date: 1716634345448,
        recommend: true
    },{
        _id: "22",
        name: "CrÃ¨me BrÃ»lÃ©e",
        description: "A creamy custard topped with a layer of caramelized sugar for a delightful crunch.",
        price: 209,
        image: [Des2],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Dessert",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "23",
        name: "New York Cheesecake with Berry Compote",
        description: "Rich, dense cheesecake served with a tangy mixed berry sauce.",
        price: 209,
        image: [Des3],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Dessert",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "24",
        name: "Panna Cotta with Raspberry Coulis",
        description: "Silky Italian custard paired with a tart raspberry sauce.",
        price: 209,
        image: [Des4],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Dessert",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "25",
        name: "Tiramisu Cup",
        description: "A layered Italian dessert with coffee-soaked ladyfingers, mascarpone cream, and cocoa powder.",
        price: 209,
        image: [Des5],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Dessert",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "26",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a gooey molten center, served with ice cream or fresh berries.",
        price: 209,
        image: [Des6],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Dessert",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "27",
        name: "Chicken Satay with Peanut Sauce",
        description: "Grilled marinated chicken skewers served with a creamy and flavorful peanut sauce.",
        price: 209,
        image: [Ap1],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Appitizer",
        date: 1716634345448,
        recommend: true
    },
    {
        _id: "28",
        name: "Crispy Spring Rolls with Sweet Chili Sauce",
        description: "Golden-fried rolls filled with vegetables or meat, paired with tangy sweet chili sauce.",
        price: 209,
        image: [Ap2],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Appitizer",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "29",
        name: "Garlic Bread Supreme",
        description: "Toasted bread infused with garlic butter, topped with cheese and herbs.",
        price: 209,
        image: [Ap3],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Appitizer",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "30",
        name: "Onion Rings with BBQ Sauce",
        description: "Crispy battered onion rings served with smoky BBQ sauce for dipping.",
        price: 209,
        image: [Ap4],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Appitizer",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "31",
        name: "Mozzarella Sticks with Marinara Dip",
        description: "Breaded mozzarella sticks fried to perfection, paired with tangy marinara sauce.",
        price: 209,
        image: [Ap5],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Appitizer",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "32",
        name: "Salad",
        description: " Fresh mixed greens and vegetables, served with your choice of dressing.",
        price: 209,
        image: [Ap6],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Appitizer",
        date: 1716634345448,
        recommend: false
    },
    {
        _id: "33",
        name: "Sweet Potato Fries with Chipotle Mayo",
        description: "Crispy sweet potato fries served with a smoky, spicy chipotle mayonnaise.",
        price: 209,
        image: [Ap7],
        rate:4.5,
        time:[10,20],
        Kcal:100,
        category: "Appitizer",
        date: 1716634345448,
        recommend: false
    }
    
]