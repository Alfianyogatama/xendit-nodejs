const { x } = require("./../helpers/xendit");
const { Disbursement, Invoice, Card } = x;
const disbursementSpecificOptions = {};
const d = new Disbursement(disbursementSpecificOptions);
/*Ini untuk create invoice*/
const invoiceSpecificOptions = {};
const i = new Invoice(invoiceSpecificOptions);
/*Card*/
const cardSpecificOptions = {};
const card = new Card(cardSpecificOptions);

const externalID = String(new Date().valueOf())

class Controller {

/*	static async createCharge(req, res) {
		try{

			const charge = await card.createCharge({
				tokenID: 'mediku-191021',
				externalID,
				amount: 23000
			})
			console.log(charge, '<<<<<charge')
			res.send(charge)
		}

		catch(err){
			console.log(err)
			res.send(err)
		}
	}*/

	// gak kepakai kayanya

	static async createInvoice(req, res) { //ini bikin invoice
		try {
			const invoice = await i.createInvoice({
				externalID,
				payerEmail: "alfianrudiyo@gmail.com", //ini yang dikirimin invoice
				description: "Invoice for Service Antigen Test",
				amount, // total price
				shouldSendEmail: true, // pilihan jika mau send email nya pakai nodemailer dari mediku saja ini di bikin false
			});
			if (invoice) {

				const {
					id: invoice_id,
					invoice_url,
					merchant_name,
					payer_email,
					status,
					expiry_date,
				} = invoice;

				res.status(200).json({
					invoice_id,
					invoice_url, //url ini bisa digunakan di nodemailer setelah user melakukan registrasi, diklik menuju pembayaran
					merchant_name,
					payer_email,
					status,
					expiry_date,
					externalID, //ini digunakan untuk cek invoice per transaksi
				});
			}
		} catch (err) {
			console.log(err);
			res.send(err);
		}
	}

	// static async checkStatusPayment(req, res) { // 
	// 	try {
	// 		const externalID = "1634650134122"; //ini didapatkan dari kembalian create invoice
	// 		const result = await d.getByExtID({
	// 			externalID,
	// 		});

	// 		if (result) {
	// 			res.status(200).json(result);
	// 		}
	// 	} catch (err) {
	// 		res.send(err);
	// 		console.log(err);
	// 	}
	// }

	static async checkInvoice(req, res) {
		try {
			const invoiceID = "616ecbe0f3bcc012521c35e5";
			const invoice = await i.getInvoice({
				invoiceID,
			});

			res.send(invoice);
		} catch (err) {
			res.send(err);
		}
	}
}

module.exports = Controller;