const server = require('express').Router()
const { Category } = require('../db.js')
const { Product } = require('../db.js')

const products = [
	{
		name: 'Notebook Lenovo',
		description:
			'Trabajá y estudiá desde casa con la comodidad que te brinda Lenovo, combinando potencia y elegancia en cada uno de sus productos.',
		price: '49000',
		stock: 20,
		image: ['1597325096_notebooklenovoideapads145n42054g500g14.jpg'],
		categories: [1],
	},
	{
		name: 'Notebook Asus',
		description:
			'El ASUS X509 está equipado con un puerto reversible USB-C™ 3.1 que facilita mucho la conexión de dispositivos y ofrece transferencias hasta 10 veces más rápidas4 que las conexiones USB 2.0 anteriores. ',
		price: '59000',
		stock: 30,
		image: ['1591705414_notebookasusx509jabr168i71065g78gb1tb15.6free.jpg'],
		categories: [1],
	},
	{
		name: 'Pc AMD Gamer ',
		description:
			'La Pc única en su categoría. Preparada para el uso intensivo en juegos, streaming, edición y producción de contenido y más. La Pc está lista para rendir al máximo bajo cualquier circunstancia de exigencia. Incluye Wraith Cooler de AMD para mantener las temperaturas al mínimo bajo exigencia por largos períodos de tiempo. Tecnología de 3ª Generación de procesadores AMD Ryzen.',
		price: '79000',
		stock: 10,
		image: ['1597422278_pcamdgamerrzmasterryzen53600atiradeonrx5708gb.jpg'],
		categories: [2],
	},
	{
		name: 'Pc INTEL Gamer',
		description:
			'Jugá en buena calidad con la potencia de Intel Core i3 de última generación. La PC Kairos Plus te permite correr de manera estable títulos actuales como GTA V, League Of Legends, APEX Legends, The Witcher, CoD: Warzone y más. Los cuatro núcleos del procesador evitan la pronta sobrecarga de uso, para mantener estable tu sistema bajo distintos usos.',
		price: '99000',
		stock: 5,
		image: ['1597438844_sdfgsdghs.jpg'],
		categories: [2],
	},
	{
		name: 'Impresora HP',
		description:
			'HP está orgulloso de proveer las impresoras más seguras del mundo. Con ellas conseguirás proteger tu información, obtener lo máximo en tecnología y un rendimiento impresionante que con seguridad se adaptará a cualquier reto que tengas. Siempre están listas para ayudar a cumplir cualquier meta y nunca quedarse atrás en momentos inoportunos.',
		price: '12000',
		stock: 100,
		image: ['1570464105_jkl.jpg'],
		categories: [3],
	},
	{
		name: 'Impresora láser Brother',
		description:
			'Brother ofrece productos con una alta calidad y soluciones de impresión bien diseñadas. Tanto para la casa, la oficina, grupos de trabajo, en blanco y negro así como a color, siempre tiene una solución para vos.',
		price: '20000',
		stock: 50,
		image: ['impresora-brother-hl-1200-monocromatica.jpg'],
		categories: [3],
	},
	{
		name: 'Placa de video MSI',
		description:
			'Para experimentar y disfrutar el impresionante mundo de la realidad virtual, se requiere hardware de alto rendimiento. MSI, marca líder mundial en juegos de alta gama y eSports, brinda el asesoramiento adecuado para asegurarse de que su sistema esté preparado para VR',
		price: '55000',
		stock: 20,
		image: ['1594755952_placadevideomsiatiradeonrx5500xt4gmechoc.jpg'],
		categories: [4],
	},
	{
		name: 'Placa de video Gigabyte GeForce',
		description:
			'La tarjeta gráfica Gigabyte GeForce GTX 1050 Ti proporciona 4 GB decapacidad de memoria DDR5. El Core GTX 1050 funciona en un chip de hasta 1303 MHz y es compatible con una memoria que funciona a 7008 MHz . La refrigeración activa es proporcionada por un enfriador con un sistema sofisticado y eficiente.',
		price: '50000',
		stock: 30,
		image: ['1520452711_crop19_20170106180918_m.png'],
		categories: [4],
	},
	{
		name: 'Monitor led LG',
		description:
			'Disfrutá de todas las cualidades que el monitor LG 20MK400HB tiene para ofrecerte. Vas a percibir las imágenes de una manera completamente diferente y podrás complementar cualquier espacio de tu casa. Un monitor a tu medida. Gracias a su pantalla led, tendrás una mejor visualización de los colores y vas a poder ahorrar energía.',
		price: '18000',
		stock: 90,
		image: ['24M38H-B_20170929_desk1.jpg'],
		categories: [5],
	},
	{
		name: 'Monitor led Samsung',
		description:
			'Una experiencia visual de calidad. Sus 22 pulgadas te resultarán de gran comodidad para estudiar, trabajar o ver una película en tus tiempos de ocio. Asimismo, su resolución de 1920 x 1080 píxeles te permitirá disfrutar de momentos únicos gracias a una imagen con gran nitidez. Por último, sus 5 milisegundos de tiempo de respuesta lo hacen ideal para gamers y cinéfilos porque será capaz de mostrar imágenes en movimiento sin halos o bordes borrosos.',
		price: '30000',
		stock: 50,
		image: ['1585890631_monitor_22_led_samsung_s22f350h_hdmi.png'],
		categories: [5],
	},
]
const categories = [
	{
		name: 'Notebooks',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		name: 'PCs de escritorio',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		name: 'Impresoras',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		name: 'Placas de video',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		name: 'Monitores',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
]

server.get('/load', (req, res) => {
	categories.forEach((category) => Category.create(category))

	Product.create(products[0])
		.then((product) => {
			product.setCategories(1)
			return Product.create(products[1])
		})
		.then((product) => {
			product.setCategories(1)
			return Product.create(products[2])
		})
		.then((product) => {
			product.setCategories(2)
			return Product.create(products[3])
		})
		.then((product) => {
			product.setCategories(2)
			return Product.create(products[4])
		})
		.then((product) => {
			product.setCategories(3)
			return Product.create(products[5])
		})
		.then((product) => {
			product.setCategories(3)
			return Product.create(products[6])
		})
		.then((product) => {
			product.setCategories(4)
			return Product.create(products[7])
		})
		.then((product) => {
			product.setCategories(4)
			return Product.create(products[8])
		})
		.then((product) => {
			product.setCategories(5)
			return Product.create(products[9])
		})
		.then((product) => {
			product.setCategories(5)
		})
		.catch(console.log)

	res.send('ok')
})

module.exports = server
