Ext.define('Employees', {
    extend: 'Ext.data.Store',
    alias: 'store.employees',

	fields:['firstName', 'lastName', 'phoneNumber'],
    data:[
        { firstName: 'Lisa',  lastName: "lisa@simpsons.com",   phoneNumber: "555-111-1224"  },
        { firstName: 'Bart',  lastName: "bart@simpsons.com",   phoneNumber: "555-222-1234"  },
        { firstName: 'Homer', lastName: "home@simpsons.com",   phoneNumber: "555-222-1244"  },
        { firstName: 'Marge', lastName: "marge@simpsons.com",  phoneNumber: "555-222-1254"  }
    ]

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
        xtype: 'textfield',
        name: 'phonenumber',
        label: 'Phone Number',
        bind: '{employee.phoneNumber}'
        
    }, {
        xtype: 'selectfield',
        name: 'office',
        label: 'Office Location',
        bind: '{employee.officeLocation}',
        options: [{
            text: "Redwood City, CA",
            value: 'rwcca'
        }, {
            text: "Lawrence, KS",
            value: 'lk'
        }, {
            text: "Frederick, MD",
            value: 'fmd'
        }],
        defaultTabletPickerConfig: {
            height: 200
        }
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





Ext.define('Demo.view.EmployeesActions',{
    extend: 'Ext.form.Panel',

    xtype:'employee-actions',
    title: 'Employee Actions',
    border: false,

    bodyPadding: 5,


    defaults: {
        xtype: 'textfield',
        msgTarget: 'side',
        allowBlank: false
    },
    items: [
        {
                title: 'Employee Directory',
                xtype: 'grid',
                iconCls: 'x-fa fa-users',
                grouped: true,
                listeners: {
                    itemtap: 'onPopupForm'
                },
                store: {
                    type: 'employees',
                    autoLoad: true,
                    sorters: ['firstName', 'lastName', 'officeLocation'],
                    grouper: 'officeLocation'
                },
                columns: [{
                    text: 'First Name',
                    dataIndex: 'firstName',
                    flex: 1
                }, {
                    text: 'Last Name',
                    dataIndex: 'lastName',
                    flex: 1
                }, {
                    text: 'Phone Number',
                    dataIndex: 'phoneNumber',
                    flex: 1
                }]
        },
        {
            xtype: 'component',
            margin: '20 0 0 0',
            html: 'Note: Please enter username and password before submitting the form, Use "demo" for username/password. <br>' +
            'Play with "Check Authentication status". It should change the response based on the actual status<br>' +
            'Application will respond to the login and enable/ disable All but Login Tab'
        }
    ]

});