
import frappe


@frappe.whitelist()
def get_active_domains():
	return frappe.get_active_domains()

@frappe.whitelist()
def validate_mode_of_payment_naming(
	old_naming=None, mode_of_payment=None, *args, **kwargs
):
	if not mode_of_payment or not old_naming:
		return True
	doc = frappe.get_doc("Mode of Payment", mode_of_payment)
	if doc.naming == old_naming:
		return True
	return False