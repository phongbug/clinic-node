Ext.onReady(() => {
    let action = { name: "create", label: "Thêm" }
    var customerForm = Ext.create('Ext.form.Panel', {
        bodyStyle: 'background:transparent',
        title: 'Thông tin bệnh nhân',
        bodyPadding: 15,
        width: 450,
        url: hostAPI + '/customer/' + action.name,
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        style: {
            marginBottom: '20px',
            position: 'absolute',
            top: '10%',
            right: '50%',
            zIndex: 999,
        },
        frame: true,
        collapsible: true,
        resizable: true,
        draggable: true,
        layout: 'anchor',
        defaults: {
            anchor: '100%',
        },
        tools: [
            {
                type: 'close',
                handler: () => authForm.setHidden(true),
            },
        ],
        defaultType: 'textfield',
        defaultStyle:{
            height:'50px'
        },
        items: [{
            fieldLabel: 'Tên bệnh nhân',
            name: 'name',
            allowBlank: false
        }, {
            fieldLabel: 'Số điện thoại',
            name: 'phone',
            allowBlank: false
        }, {
            fieldLabel: 'Tuổi',
            name: 'age',
            allowBlank: false
        }, {
            fieldLabel: 'Giới tính',
            name: 'gender',
            allowBlank: false
        }, {
            fieldLabel: 'Nghề nghiệp',
            name: 'career',
            allowBlank: false
        }, {
            fieldLabel: 'Địa chỉ',
            name: 'address',
            allowBlank: false
        }, {
            fieldLabel: 'Loại bệnh',
            name: 'disease_type',
            allowBlank: false
        }, {
            fieldLabel: 'Khám thường niên',
            name: 'appointment_date',
            allowBlank: false
        }],
        buttons: [{
            text: 'Reset',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }, {
            text: action.label,
            formBind: true,
            disabled: true,
            handler: function () {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function (form, action) {
                            if (!action.result.success)
                                Ext.Msg.alert('Login Failed', action.result.message);
                            else {

                            }
                        },
                        failure: function (form, action) {
                            Ext.Msg.alert('Failed', action.result.message);
                        }
                    });
                }
            }
        }],
        renderTo: 'app'
    })
})