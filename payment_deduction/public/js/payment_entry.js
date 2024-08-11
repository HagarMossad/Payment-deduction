frappe.ui.form.on("Payment Entry", {
    paid_amount:(frm)=>{
        frappe.call({
          method: "payment_deduction.api.get_active_domains",
          callback: function (r) {
            if (r.message && r.message.length) {
              if (r.message.includes("Payment Deduction")) {
                frm.events.get_deduct_amount(frm);
              }  
              }
          }
      })
    },
    mode_of_payment:(frm)=>{
        frappe.call({
          method: "payment_deduction.api.get_active_domains",
          callback: function (r) {
            if (r.message && r.message.length) {
              if (r.message.includes("Payment Deduction")) {
                if(frm.doc.mode_of_payment !=''){
                  frm.events.get_deduct_amount(frm);
                  frappe.call({
                  "method":"payment_deduction.api.validate_mode_of_payment_naming",
                  args:{
                      old_naming:frm.doc.mode_of_payment_naming,
                      mode_of_payment:frm.doc.mode_of_payment
                  },callback(r){
                      if(!r.message){
                          frm.set_value("mode_of_payment",'');
                          frappe.throw(__("Different naming template"))
                      }
                  }
              })
              }
              }  
              }
          }
      })
    
    },
    get_deduct_amount:(frm)=>{
        cur_frm.clear_table("taxes");
        frm.refresh_fields("taxes");
        frappe.call({
            "method": "frappe.client.get",
                args: {
                    doctype: "Mode of Payment",
                    name: frm.doc.mode_of_payment
                },callback(r){
                    if(r.message){
                        let res = r.message;
                        if(res.has_deduct){
                            var row = cur_frm.add_child("taxes")
                            row.charge_type = "Actual";
                            row.account_head = res.recived_account;
                            row.description = res.recived_account;
                            // row.percentage = res.deduct_percentage;
                            //row.cost_center = res.cost_center
                            row.rate =res.deduct_percentage; //frm.doc.paid_amount * (res.deduct_percentage/100);
                            row.tax_amount = frm.doc.paid_amount * (res.deduct_percentage/100);
                            frm.refresh_fields("taxes");
                        }
                    }
                }
        })
    }


})