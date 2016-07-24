CG = window.CG || {};

CG = {
    _init: function()
    {
        window.addEventListener('offline', function() {
            CG.offlineStatus();
        });     
        window.addEventListener('online', function() {
            console.log('online');
        });       
    },
    
    offlineStatus: function()
    {
        this.showToast();
        var t = setTimeout(function() {
            CG.hideToast();
            t = null;
        }, 2000);
    },

    showToast: function()
    {
        document.getElementById('offline-status').classList.remove('is-hidden');
    },

    hideToast: function()
    {
        document.getElementById('offline-status').classList.add('is-hidden');  
    }

}

CG._init();