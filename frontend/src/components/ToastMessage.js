import { useEffect } from 'react';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ToastMessage = ({ id = 'toast', message, type = 'success', show }) => {
    useEffect(() => {
        if (show) {
            const toastEl = document.getElementById(id); //Busca o elemento do Toast.
            if (toastEl) {
                const toast = new bootstrap.Toast(toastEl); //Instância do Toast do Bootstrap.
                toast.show();
            }
        }
    }, [show, id]);

    const bgColor = {success: 'bg-success', error: 'bg-danger'}[type] || 'bg-primary'; //Dependendo do type informado, define se é 'success' ou 'error'. 

    return (
        <div className="toast-container position-fixed top-0 end-0 p-3">
            <div
                id={id}
                className={`toast align-items-center text-white ${bgColor} border-0`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className="d-flex">
                    <div className="toast-body">{message}</div>
                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default ToastMessage;