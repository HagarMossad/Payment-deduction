
import frappe

def after_install():
    create_domain_list()

def create_domain_list():
	if not frappe.db.exists("Domain", "Payment Deduction"):
		dm1 = frappe.new_doc("Domain")
		dm1.domain = 'Payment Deduction'
		dm1.insert()