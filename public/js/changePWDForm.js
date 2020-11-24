var changePWDForm = Ext.create('Ext.Panel', {
  id: 'changePWDForm',
  layout: 'center',
  border: false,
  bodyStyle: 'background:transparent',
  bodyPadding: '50%',
  hidden: true,
  items: [
    {
      xtype: 'form',
      bodyStyle: 'background:transparent',
      title: 'Thay đổi mật khẩu',
      icon: changePWDFormAction.icon,        
      bodyPadding: 15,
      width: 350,
      layout: 'anchor',
      frame: true,
      defaults: {
        anchor: '100%',
      },
      tools: [
        {
          type: 'close',
          handler: () => {
            changePWDForm.hide();
            Ext.getCmp('loginForm').show();
          },
        },
      ],
      listeners: {
        hide: () => Ext.getCmp('loginForm').show(),
      },
      defaultType: 'textfield',
      defaultStyle: {
        height: '70px',
      },
      items: [
        {
          fieldLabel: 'Mật khẩu hiện tại',
          labelWidth: 130,
          inputType: 'password',
          name: 'currentPassword',
          allowBlank: false,
        },
        {
          fieldLabel: 'Mật khẩu mới',
          labelWidth: 130,
          inputType: 'password',
          name: 'newPassword',
          allowBlank: false,
        },
        {
          fieldLabel: 'Lập lại mật khẩu mới',
          labelWidth: 130,
          inputType: 'password',
          name: 'newPasswordConfirm',
          allowBlank: false,
        },
      ],
      buttons: [
        {
          icon:
            'https://icons.iconarchive.com/icons/custom-icon-design/flatastic-8/16/Refresh-icon.png',
          text: 'Làm mới',
          handler: function () {
            this.up('form').getForm().reset();
          },
          id: 'btnResetChangePWDForm',
        },
        {
          id: 'btnSubmitChangePWDForm',
          text: 'Đổi mật khẩu',
          icon: changePWDFormAction.icon,
          formBind: true,
          disabled: false,
          handler: function () {
            var form = this.up('form').getForm();
            if (form.isValid()) {
              this.setIcon('img/loading.gif');
              form.submit({
                url: hostAPI + '/customer/' + changePWDFormAction.name,
                success: function (form, action) {
                  if (!action.result.success)
                    Ext.Msg.alert('Kểt Quả', action.result.message);
                  else {
                  }
                  Ext.getCmp('btnSubmitChangePWDForm').setIcon(
                    changePWDFormAction.icon
                  );
                  Ext.getCmp('loginForm').show();
                },
                failure: function (form, action) {
                  Ext.Msg.alert('Thông báo lỗi', action.result.message);
                  Ext.getCmp('btnSubmitChangePWDForm').setIcon(
                    changePWDFormAction.icon
                  );
                },
              });
            }
          },
        },
      ],
    },
  ],
  renderTo: 'app',
});
