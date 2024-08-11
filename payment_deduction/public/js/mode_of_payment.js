
frappe.ui.form.on('Mode of Payment', {  

	refresh: function(frm) {
        frappe.call({
            method: "payment_deduction.api.get_active_domains",
            callback: function (r) {
              if (r.message && r.message.length) {
                if (r.message.includes("Payment Deduction")) {
                    frm.set_query("recived_account", function () {
                        return {
                            filters: [
                            ["is_group", "=", 0]
                            ],
                    };})
                    frm.set_query("cost_center", function () {
                        return {
                            filters: [
                            ["is_group", "=", 0]
                            ],
                    };})
                }  
                }
            }
        })
    }

})