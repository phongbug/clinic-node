var customerForm = Ext.create('Ext.form.Panel', {
  id: 'customerForm',
  bodyStyle: 'background:transparent',
  title: 'Thông tin bệnh nhân',
  icon:
    'https://icons.iconarchive.com/icons/dapino/medical/24/medical-suitecase-icon.png',
  bodyPadding: 15,
  width: 450,
  layout: 'anchor',
  defaults: {
    anchor: '100%',
  },
  style: {
    position: 'absolute',
    top: '100px',
    left: '100px',
    right: '50%',
    zIndex: 999,
  },
  frame: true,
  hidden: true,
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
      handler: () => {
        customerForm.hide();
        Ext.getCmp('customerGrid').enable();
      },
    },
  ],
  listeners: {
    hide: () => Ext.getCmp('customerGrid').enable(),
  },
  defaultType: 'textfield',
  defaultStyle: {
    height: '50px',
  },
  items: [
    {
      xtype: 'hiddenfield',
      name: 'id',
      allowBlank: false,
    },
    {
      fieldLabel: 'Tên bệnh nhân',
      name: 'name',
      allowBlank: false,
    },
    {
      xtype: 'numberfield',
      fieldLabel: 'Số điện thoại',
      name: 'phone',
      allowBlank: false,
      hideTrigger: true,
      keyNavEnabled: false,
      mouseWheelEnabled: false,
    },
    {
      xtype: 'numberfield',
      fieldLabel: 'Tuổi',
      name: 'age',
      allowBlank: false,
      minValue: 0,
      maxValue: 150,
    },
    {
      fieldLabel: 'Giới tính',
      name: 'gender',
      allowBlank: false,
      xtype: 'combo',
      width: 150,
      editable: false,
      store: new Ext.data.ArrayStore({
        fields: ['id', 'name'],
        data: [
          [1, 'Nam'],
          [0, 'Nữ'],
        ],
      }),
      displayField: 'name',
      valueField: 'id',
      value: 1,
      queryMode: 'local',
    },
    {
      fieldLabel: 'Nghề nghiệp',
      name: 'career',
      allowBlank: false,
    },
    {
      fieldLabel: 'Địa chỉ',
      name: 'address',
      allowBlank: false,
    },
    {
      fieldLabel: 'Loại bệnh',
      name: 'disease_type',
      allowBlank: false,
    },
    {
      xtype: 'datefield',
      fieldLabel: 'Ngày tái khám',
      name: 're_examination_date',
      allowBlank: false,
      value: new Date(),
      //format:'H:i d/m/Y'
      format: 'd/m/Y',
    },
    {
      xtype: 'numberfield',
      fieldLabel: 'Khám thường niên',
      name: 'annual_examination',
      allowBlank: false,
      minValue: 0,
      maxValue: 10,
      //regex: /^([1-9]|1[0-9]):([0-5][0-9])(\s[a|p]m)$/i,
      maskRe: /[\d\s:amp]/i,
      msgTarget: 'under',
      invalidText: 'Khám thường niên 0-10',
    },
    {
      fieldLabel: 'Ghi chú',
      name: 'note',
      allowBlank: true,
    },
  ],
  buttons: [
    {
      icon:
        'https://icons.iconarchive.com/icons/custom-icon-design/flatastic-8/16/Refresh-icon.png',
      text: 'Reset',
      handler: function () {
        this.up('form').getForm().reset();
        log(customerFormAction.name);
      },
      id: 'btnResetCustomerForm',
    },
    {
      id: 'btnSubmitCustomerForm',
      text: customerFormAction.label,
      icon: customerFormAction.icon,
      formBind: true,
      disabled: false,
      handler: function () {
        var form = this.up('form').getForm();
        if (form.isValid()) {
          this.setIcon('img/loading.gif');
          form.submit({
            url: hostAPI + '/customer/' + customerFormAction.name,
            success: function (form, action) {
              if (!action.result.success)
                Ext.Msg.alert('Kểt Quả', action.result.message);
              else {
                let grid = Ext.getCmp('customerGrid'),
                  store = grid.getStore();
                switch (customerFormAction.name) {
                  case 'create':
                    // add new record
                    let r = action.result.data,
                      rIndex = store.getData().getCount();
                    // fix bind new r(just added) to form
                    r.re_examination_date = r.re_examination_date.substr(0, 10);
                    store.insert(rIndex, r);
                    // reset form
                    customerForm.reset();

                    grid.getView().addRowCls(rIndex, 'success');
                    break;
                  case 'update':
                    let record = form.getValues();
                    // fix binding betwwen datefield & datecolumn
                    record.re_examination_date = record.re_examination_date
                      .split('-')
                      .reverse()
                      .join('/');
                    log(record);
                    var removedRecord = store.findRecord('id', record.id);
                    var recordIndex = store.indexOf(removedRecord);
                    store.remove(removedRecord);
                    store.insert(recordIndex, record);
                    grid.getView().addRowCls(recordIndex, 'success');
                    customerForm.hide();
                    break;
                  case 'delete':
                    break;
                }
              }
              Ext.getCmp('btnSubmitCustomerForm').setIcon(
                customerFormAction.icon
              );
            },
            failure: function (form, action) {
              Ext.Msg.alert('Thông báo lỗi', action.result.message);
              Ext.getCmp('btnSubmitCustomerForm').setIcon(
                customerFormAction.icon
              );
            },
          });
        }
      },
    },
  ],
  renderTo: 'app',
});
