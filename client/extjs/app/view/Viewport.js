// --- Define Data Store

Ext.define('Employees', {
    extend: 'Ext.data.Store',
    alias: 'store.employees',
        
//    proxy: {
//        type: 'ajax',
//        url: 'data1.json'
//    }
    
});

Ext.define('PopupForm', {
    extend: 'Ext.form.Panel',
    xtype: 'popupform',
    controller: 'popupform',

    title: 'Update Record',

    width: 300,
    floating: true,
    centered: true,
    modal: true,

    items: [{
        xtype: 'textfield',
        name: 'firstname',
        label: 'First Name',
        bind: '{employee.firstName}'
    }, {
        xtype: 'textfield',
        name: 'lastname',
        label: 'Last Name',
        bind: '{employee.lastName}'
        
    }, {
        xtype: 'toolbar',
        docked: 'bottom',
        items: ['->', {
            xtype: 'button',
            text: 'Submit',
            iconCls: 'x-fa fa-check',
            handler: 'submitUpdate'
        }, {
            xtype: 'button',
            text: 'Cancel',
            iconCls: 'x-fa fa-close',
            handler: 'cancelUpdate'
        }]
    }]
});


Ext.define('PopupFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.popupform',
    
    cancelUpdate: function () {
        var view = this.getView(),
            record = view.getRecord();
        
        view.destroy();
        record.reject();
    },
    
    submitUpdate: function(me) {
        var view = this.getView(),
            record = view.getRecord();
        
        view.destroy();
        record.commit();
    }
});

//----------------------------------------------------

Ext.define('MyListViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.listview',
    
    onPopupForm: function (view, index, item, record) {
        Ext.Viewport.add({
            xtype: 'popupform',
            width: 400,
            record: record,
            viewModel : {
                data: {
                    employee: record
                }
            }
        });
    }
});






Ext.define('Demo.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.tab.Panel'
    ],

    layout: 'border',

    items: [{
        region: 'center',
        xtype: 'tabpanel',
        items: [
            {
                xtype:'demo-cookies'
            },
            {
                xtype:'grid-metadata',
                disabled: true
            },
            {
                xtype:'grid-actions',
                disabled: true
            },
            {
                xtype:'method-call',
                disabled: true
            },
            {
                xtype:'form-actions',
                disabled: true
            },
            {
                xtype:'form-upload',
                disabled: true
            },
            {
                xtype:'tree-actions',
                disabled: true
            },
            {
                xtype:'user-actions',
                disabled: true
            }
			/**/
			,
            {
                xtype:'employee-actions',
				controller: 'listview',
                disabled: true
            }
            
			
			
        ]
    }]
});