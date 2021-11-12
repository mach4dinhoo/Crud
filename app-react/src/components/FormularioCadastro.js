import React, { useEffect, useState } from 'react';

const FormularioCadastro = (props) =>{

    //VARIAVEIS DE CAPTURA DE DADOS 

    const CamposIniciaisDeValores = {
        matricula:'',
        senha:'',
        email:'',
        codTurma:''
    }

    const [ values, setValues] = useState(CamposIniciaisDeValores)
    
    useEffect( () =>{
        if(props.idAtual == ''){
            setValues({
                ...CamposIniciaisDeValores
            })
        }
        else {
            setValues({
                ...props.dadosPacintes[props.idAtual]
            })
        }
    }, [props.idAtual, props.dadosPacintes])

    const manipuladorOnChange = e =>{
        let {name, value} = e.target
        
        setValues({
            ...values,
            [name]:value
        },[])
    }

    const manipuladorFormEnvio = e =>{
        e.preventDefault() 
        console.log(values)
        props.addEedit(values) 
    }

    return (
        <form autoComplete="off" onSubmit={manipuladorFormEnvio}>
            <div className="form-group input-group">
                <div className="input-grou-prepen">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>

                <input className="form-control" placeholder="Matrícula" name="matricula" value={values.matricula}
                onChange={manipuladorOnChange}/>
            </div>

        
            <div className="row">
                <div className="form-group input-group col-md-6">
                    <div className="input-grou-prepen">
                        <div className="input-group-text">
                        <i class="fas fa-key"></i>
                        </div>
                    </div>

                    <input className="form-control"  type="password" placeholder="senha" name="senha" value={values.senha}
                    onChange={manipuladorOnChange}/>
                </div>

                <div className="form-group input-group col-md-6">
                    <div className="input-grou-prepen">
                        <div className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Email" name="email" value={values.email}
                    onChange={manipuladorOnChange}/>
                </div>
            </div>

            <div className="form-group input-group">
                <div className="input-grou-prepen">
                    <div className="input-group-text">
                        <i class="fas fa-key"></i>
                    </div>
                </div>

                <input className="form-control" placeholder="Código da turma" name="codTurma" value={values.codTurma}
                onChange={manipuladorOnChange}/>
            </div>

            <div className="form-group">
                <input type="submit" value={props.idAtual == '' ? 'Cadastrar' : 'atualizar'} className="btn btn-primary btn-block" />
            </div>
        </form>

    )
}

export default FormularioCadastro
