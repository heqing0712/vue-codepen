import vs from '../core';
import store from 'store';
let storeName = "vseditor-v" + vs.version;
let storeData = store.get(storeName);

vs.storeData = storeData;


//保存缓存
vs.saveStore = function () {

    store.set(storeName, storeData);
};


//获取缓存
vs.getStore = function (name) {

    return storeData[name];
};


//设置缓存
vs.setStore = function (name, val) {
    storeData[name] = val;
    vs.saveStore();
};


if (!storeData) {

    vs.storeData = storeData = {};
    vs.saveStore();
}


