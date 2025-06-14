import ToastMessage from '../components/ToastMessage';
import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(); //Cria o contexto. 

export const ToastProvider = ({ children }) => { //Estado do Toast. 
    const [show, setShow] = useState(false); //Controla se o Toast deve aparecer 'true' ou 'false'. 
    const [message, setMessage] = useState(''); //Mensagem que será exibida no Toast. 
    const [type, setType] = useState('success'); //Tipo do Toast para definir as cores. 

    //'useCallback' - Memoriza a função para que não seja recriada toda vez que renderiza. 
    const showToast = useCallback((msg, toastType = 'success') => {
        setMessage(msg);
        setType(toastType);
        setShow(true);

        //Após 2 segundos, esconde o toast para poder exibir o próximo.
        setTimeout(() => {
            setShow(false);
        }, 2000);
    }, []);

    //Provider fornece acesso às funções do Toast.
    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastMessage message={message} type={type} show={show} />
        </ToastContext.Provider>
    );
};

//Cria a hook. 
export const useToast = () => {
    return useContext(ToastContext);
};