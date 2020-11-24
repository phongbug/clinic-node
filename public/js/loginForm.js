Ext.onReady(() => {
	var loginForm = Ext.create('Ext.Panel', {
		id:'loginForm',
		layout: 'center',
		border: false,
		bodyStyle: 'background:transparent',
		bodyPadding: '50%',
		items: [{
			xtype: 'form',
			bodyStyle: 'background:transparent',
			title: 'Nhập mật khẩu',
			bodyPadding: 15,
			width: 190,
			url: hostAPI + '/user/login',
			layout: 'anchor',
			defaults: {
				anchor: '100%'
			},
			icon :'https://icons.iconarchive.com/icons/hopstarter/soft-scraps/16/Lock-Unlock-icon.png',
			listeners: {
				afterrender: () => {
				  var loading = document.getElementById('loading');
				  loading.classList.remove('spinner');
				  loadScript('js/changePWDForm.js')
				},
			  },
			defaultType: 'textfield',
			items: [{
				inputType: 'password',
				placeholder: 'password',
				name: 'password',
				allowBlank: false
			}],
			buttons: [{
				text: 'Đổi mật khẩu',
				handler: function () {
					Ext.getCmp('loginForm').hide()
					Ext.getCmp('changePWDForm').show()
				}
			}, {
				text: 'Đăng nhập',
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
									token = action.result.token
									localStorage.setItem('token', token)
									document.getElementById('app').innerHTML = '';
									loadScript('js/customerGrid.js')
								}
							},
							failure: function (form, action) {
								Ext.Msg.alert('Failed', action.result.message);
							}
						});
					}
				}
			}]
		}],
		renderTo: 'app'
	});
})
