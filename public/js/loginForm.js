let changePWDFormAction = {
  icon:
    'https://icons.iconarchive.com/icons/custom-icon-design/flatastic-9/16/Generate-keys-icon.png'
};
Ext.onReady(() => {
  var loginForm = Ext.create('Ext.Panel', {
    id: 'loginForm',
    layout: 'center',
    border: false,
    bodyStyle: 'background:transparent',
    bodyPadding: '50%',
    items: [
      {
        xtype: 'form',
        bodyStyle: 'background:transparent',
        title: 'Nhập mật khẩu',
        bodyPadding: 15,
        width: 240,
        url: hostAPI + '/user/login',
        layout: 'anchor',
        frame: true,
        defaults: {
          anchor: '100%',
        },
        icon:
          'https://icons.iconarchive.com/icons/hopstarter/soft-scraps/16/Lock-Unlock-icon.png',
        listeners: {
          afterrender: () => {
            var loading = document.getElementById('loading');
            loading.classList.remove('spinner');
            loadScript('js/changePWDForm.js');
          },
        },
        defaultType: 'textfield',
        items: [
          {
            inputType: 'password',
            placeholder: 'password',
            name: 'password',
            allowBlank: false,
          },
        ],
        buttons: [
          {
            text: 'Đổi mật khẩu',
            icon: changePWDFormAction.icon,
            handler: function () {
              Ext.getCmp('loginForm').hide();
              Ext.getCmp('changePWDForm').show();
            },
          },
          {
            text: 'Đăng nhập',
            formBind: true,
            disabled: true,
            icon:
              'https://icons.iconarchive.com/icons/custom-icon-design/flatastic-8/16/Keys-icon.png',
            handler: function () {
              let me = this;
              var form = this.up('form').getForm();
              me.setIconCls('spinner');
              me.disable();
              if (form.isValid()) {
                form.submit({
                  success: function (form, action) {
                    if (!action.result.success) {
                      Ext.Msg.alert('Login Failed', action.result.message);
                      me.enable();
                    } else {
                      let authToken = action.result.authToken;
                      localStorage.setItem('authToken', authToken);
                      document.getElementById('app').innerHTML = '';
                      me.setIconCls('');
                      me.enable();
                      loadScript('js/customerGrid.js');
                    }
                  },
                  failure: function (form, action) {
                    me.setIconCls('');
                    me.enable();
                    Ext.Msg.alert('Failed', action.result.message);
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
});
