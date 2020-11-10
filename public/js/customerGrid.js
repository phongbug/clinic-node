// Global Variables
let Groups,
    data = [],
    cellClickCount = 1,
    featureGrouping = Ext.create('Ext.grid.feature.GroupingSummary', {
        startCollapsed: true,
        showSummaryRow: false,
        groupHeaderTpl: [
            '<div style="color:#d14836; font-weight: bold">{name:this.formatName}<span style="color:green; font-weight: normal"> ({rows.length} {[values.rows.length > 1 ? "White Labels" : "White Label"]})</span></div>',
            {
                formatName: (name) => {
                    for (let i = 0; i < Groups.items.length; i++) {
                        if (name.toString() === Groups.items[i]._groupKey.toString()) {
                            switch (name) {
                            }
                            return (
                                '<span style="color:green">[' + (i + 1) + ']</span> ' + name
                            );
                        }
                    }
                },
            },
        ],
    });
Ext.onReady(function () {
    loadScript('js/customerForm.js');
    // prevent browser call loadScript('js/*..js') at console log
    if (!isAuthenticated()) return;
    Ext.define('Customer', {
        extend: 'Ext.data.Model',
        fields: [
            'id',
            'id_ref',
            'phone',
            'name',
            'age',
            'gender',
            'career',
            'address',
            'disease_type',
            're_examination_date',
            'annual_examination',
            'note',
        ],
    });
    var storeCustomer = Ext.create('Ext.data.Store', {
        model: 'Customer',
        proxy: {
            type: 'ajax',
            url: hostAPI + '/customer/list',
            reader: {
                type: 'json',
            },
        },
        listeners: {
            load: function (_, records, successful, operation, eOpts) {

            },
        },
        autoLoad: true,
    });

    var girdWLs = Ext.create('Ext.grid.Panel', {
        renderTo: 'app',
        store: storeCustomer,
        width: Ext.getBody().getViewSize().width,
        height: Ext.getBody().getViewSize().height,
        title: 'Customers',
        plugins: [
            'gridfilters',
            //'cellediting'
        ],
        // Can not open href
        //plugins: [{
        //	ptype: 'cellediting',
        //	clicksToEdit: 3
        //}],
        //selModel: 'cellmodel',
        features: [
            //{ ftype: 'grouping' },
            featureGrouping,
        ],
        listeners: {
            viewready: (grid) => {
                loadScript('js/customerForm.js');
            },
        },
        tbar: [
            {
                xtype: 'button',
                id: 'btnRefresh',
                icon:
                    'https://icons.iconarchive.com/icons/graphicloads/100-flat/16/reload-icon.png',
                text: 'Refresh',
                // other component can not fireEvent to
                // handler: () => { storeCustomer.clearFilter(); storeCustomer.loadData(data) },
                listeners: {
                    click: () => {
                        storeCustomer.clearFilter();
                        storeCustomer.loadData(data);
                    },
                },
            },
            {
                xtype: 'combo',
                width: 120,
                store: new Ext.data.ArrayStore({
                    fields: ['id', 'name'],
                    data: [
                        ['default', 'Chọn nhóm'],
                        ['address', 'Địa chỉ'],
                        ['disease_type', 'Loại bệnh'],
                        ['career', 'Nghề nghiệp'],
                    ],
                }),
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                name: 'cbbGrouping',
                id: 'cbbGrouping',
                value: 'default',
                editable: false,
                listeners: {
                    change: (_, val) => {
                        if (val !== 'default') {
                            storeCustomer.setGroupField(val);
                            Groups = storeCustomer.getGroups();
                            storeCustomer.loadData(data);
                            featureGrouping.collapseAll();
                        }
                    },
                },
            },
            {
                xtype: 'combo',
                width: 150,
                // store: new Ext.data.ArrayStore({
                //     fields: ['id', 'name'],
                //     data: listNameWLs,
                // }),
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
                value: '',
                id: 'txtCustomerName',
                itemId: 'txtCustomerName',
                multiSelect: true,
                enableKeyEvents: true,
                doQuery: function (queryString, forceAll) {
                    this.expand();
                    this.store.clearFilter(!forceAll);

                    if (!forceAll) {
                        this.store.filter(
                            this.displayField,
                            new RegExp(Ext.String.escapeRegex(queryString), 'i')
                        );
                    }
                },
                listeners: {
                    keypress: function (cb, e) {
                        console.log(cb.getRawValue());
                        storeCustomer.filter('name', cb.getRawValue());
                    },
                },
            },
            {
                xtype: 'button',
                text: 'Find',
                id: 'btnFind',
                icon:
                    'https://icons.iconarchive.com/icons/zerode/plump/16/Search-icon.png',
                handler: () =>
                    storeCustomer.getFilters().add({
                        property: 'name',
                        value: Ext.getCmp('txtCustomerName')
                            .getRawValue()
                            .split(',')
                            .map((e) => e.trim().toUpperCase()),
                        operator: 'in',
                    }),
            },
            '->',
            {
                xtype: 'button',
                id: 'btnLogout',
                icon:
                    'https://icons.iconarchive.com/icons/saki/nuoveXT-2/16/Apps-session-logout-icon.png',
                text: 'Logout',
                dock: 'right',
                listeners: {
                    click: () => {
                        localStorage.removeItem('token');
                        location.reload();
                    },
                },
            },
        ],
        columns: [
            new Ext.grid.RowNumberer({ dataIndex: 'no', text: 'No.', width: 60 }),
            {
                text: 'ID',
                width: 50,
                dataIndex: 'id_ref',
            },
            {
                text: 'Tên bệnh nhân',
                width: 180,
                dataIndex: 'name',
                renderer: (val, _, record) => val,
                editor: {
                    completeOnEnter: false,

                    // If the editor config contains a field property, then
                    // the editor config is used to create the Ext.grid.CellEditor
                    // and the field property is used to create the editing input field.
                    field: {
                        xtype: 'textfield',
                        allowBlank: false,
                    },
                },
            },

            {
                text: 'Số điện thoại',
                width: 120,
                dataIndex: 'phone',
            },

            {
                text: 'Năm sinh',
                width: 80,
                dataIndex: 'age',
            },
            {
                text: 'Giới tính',
                width: 80,
                dataIndex: 'gender',
                renderer: (v, _, r) => v === 0 ? 'Nữ' : 'Nam'
            },
            {
                text: 'Nghề nghiệp',
                width: 150,
                dataIndex: 'career',
            },
            {
                text: 'Loại bệnh',
                width: 150,
                dataIndex: 'disease_type',
            },
            {
                text: 'Khám thường niên',
                width: 150,
                dataIndex: 'appointment_date',
            },
            {
                text: 'Ghi chú',
                width: 150,
                dataIndex: 'note',
            },
        ],
        hidden:true
    });
});
