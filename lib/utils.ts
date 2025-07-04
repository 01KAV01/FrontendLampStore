export const categoryMenuList = [
  {
    id: 1,
    title: "Smart Phones",
    src: "/smart phone icon.png",
    href: "/shop/smart-phones"
  },
  {
    id: 2,
    title: "Tablets",
    src: "/tablet icon.png",
    href: "/shop/tablets"
  },
  {
    id: 3,
    title: "Mouses",
    src: "/mouse icon.png",
    href: "/shop/mouses"
  },
  {
    id: 4,
    title: "Cameras",
    src: "/camera icon.png",
    href: "/shop/cameras"
  },
  {
    id: 5,
    title: "Smart Watches",
    src: "/smart watch.png",
    href: "/shop/watches"
  },
  {
    id: 6,
    title: "Laptops",
    src: "/laptop icon.png",
    href: "/shop/laptops"
  },
  {
    id: 7,
    title: "PCs",
    src: "/pc icon.png",
    href: "/shop/computers"
  },
  {
    id: 8,
    title: "Printers",
    src: "/printers icon.png",
    href: "/shop/printers"
  },
  {
    id: 9,
    title: "Earbuds",
    src: "/ear buds icon.png",
    href: "/shop/earbuds"
  },
  {
    id: 10,
    title: "Head Phones",
    src: "/headphone icon.png",
    href: "/shop/headphones"
  },
];

export const incentives = [
  {
    name: "Free Shipping",
    description:
      "Our shipping is completely free and that is completely good for our customers.",
    imageSrc: "/shipping icon.png",
  },
  {
    name: "24/7 Customer Support",
    description:
      "Our support is working all day and night to answer any question you have.",
    imageSrc: "/support icon.png",
  },
  {
    name: "Fast Shopping Cart",
    description:
      "We have super fast shopping experience and you will enjoy it.",
    imageSrc: "/fast shopping icon.png",
  },
];

export const navigation = {
  sale: [
    { name: "Скидки", href: "#" },
    { name: "Новости", href: "#" },
    { name: "Регистрация скидки", href: "#" },
  ],
  about: [
    { name: "О компании LampStore", href: "#" },
    { name: "Работа с нами", href: "#" },
    { name: "Профиль компании", href: "#" },
  ],
  buy: [
    { name: "Карта лояльности LampStore", href: "#" },
    { name: "Условия эксплуатации", href: "#" },
    { name: "Политика конфиденциальности", href: "#" },
    { name: "Жалобы", href: "#" },
    { name: "Партнёры", href: "#" },
  ],
  help: [
    { name: "Контакты", href: "#" },
    { name: "Как купить в LampStore", href: "#" },
    { name: "FAQ", href: "#" },
  ],
};

export function isValidNameOrLastname(str: string) {
  return /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(str);
}

export const isValidEmailAddressFormat = (input: string) => {

  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(input);
};

export const isValidCardNumber = (input: string) => {

  const cleanedInput = input.replace(/[^0-9]/g, "");

  const regex = /^\d{13,19}$/;
  return regex.test(cleanedInput);
}

export const isValidCreditCardExpirationDate = (input: string) => {

  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  return regex.test(input);
};

export const isValidCreditCardCVVOrCVC = (input: string) => {

  const regex = /^[0-9]{3,4}$/;
  return regex.test(input);
};
