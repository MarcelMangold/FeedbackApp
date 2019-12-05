import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Toast } from '../models/toast';

@Injectable({
    providedIn: 'root'
})


export class ToastHelper {
    public toast:any;



    constructor(private toastController: ToastController) {
       
    }


    public showToast(toast:Toast) {
        this.toast = this.toastController.create({
            message: toast.message,
            duration: 2000,
            showCloseButton: true,
            position: toast.position,
            closeButtonText: 'OK',
            color: toast.color
        }).then((toastData) => {
            toastData.present();
        });

    }


}