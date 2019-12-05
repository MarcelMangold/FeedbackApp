
export class Toast {
    public message: string;
    public color: "success" | "warning" | "danger";
    public position: "top" | "bottom" | "middle";

    constructor( message: string, color: "success" | "warning" | "danger", position: "top" | "bottom" | "middle") {
        this.message = message;
        this.color = color;
        this.position = position;
    }
}

export interface ToastWithContent {
    toast:Toast;
    content: any;
}


