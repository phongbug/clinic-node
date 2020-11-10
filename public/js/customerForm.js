Ext.onReady(() => {
  let action = { name: 'create', label: 'Thêm' };
  var customerForm = Ext.create('Ext.form.Panel', {
    bodyStyle: 'background:transparent',
    title: 'Thông tin bệnh nhân',
    bodyPadding: 15,
    width: 450,
    url: hostAPI + '/customer/' + action.name,
    layout: 'anchor',
    defaults: {
      anchor: '100%',
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
    defaultStyle: {
      height: '50px',
    },
    items: [
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
        xtype: 'datetime',
        fieldLabel: 'Ngày tái khám',
        name: 're_examination_date',
        allowBlank: false,
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
    ],
    buttons: [
      {
        text: 'Reset',
        handler: function () {
          this.up('form').getForm().reset();
        },
      },
      {
        text: action.label,
        formBind: true,
        disabled: false,
        handler: function () {
          var form = this.up('form').getForm();
          let values = form.getValues();
          log(values);
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
              },
            });
          }
        },
      },
    ],
    renderTo: 'app',
  });
});
