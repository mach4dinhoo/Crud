import React, { useState, useEffect } from 'react'
import FormularioCadastro from './FormularioCadastro'
import fireDb from '../database/firebase'


const Cadastro = () => {

    const [dadosPacintes, setDadosPacientes] = useState({})

    let [idAtual, setIdAtual] = useState('')


    useEffect(() => {
        fireDb.child('cadastros').on('value', dbPhoto => {
            if (dbPhoto.val() != null) {
                setDadosPacientes({
                    ...dbPhoto.val()
                })
            } else {
                setDadosPacientes({})
            }
        })
    }, [])

    const addEedit = obj => {

        if (idAtual == '') {
            console.log(obj)
            fireDb.child('cadastros').push(
                obj,
                error => {
                    if (error) {
                        console.log(error)
                    } else {
                        setIdAtual('')
                    }
                }
            )
        } else {
            fireDb.child(`cadastros/${idAtual}`).set(
                obj,
                err => {
                    if (err) {
                        console.log(err)
                    }
                }
            )
        }
    }


    const deleteCadastro = idAtual => {
        if (window.confirm('Deseja deletar esse cadastro ?')) {
            fireDb.child(`cadastros/${idAtual}`).remove(
                err => {
                    if (err) {
                        console.log(err)
                    }
                }
            )
        }
    }


    return (
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Cadastro escolar</h1>
                    <p className="lead">Professores e alunos.</p>
                </div>
            </div>

            <div className="row">

                <div className="col-md-5">
                    <FormularioCadastro {...({ addEedit, idAtual, dadosPacintes })} />
                </div>

                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <td>Matrícula</td>
                                <td>E-mail</td>
                                <td>Código da turma</td>
                                <td>Ações</td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                Object.keys(dadosPacintes).map(id => {
                                    return <tr key={id}>
                                        <td> {dadosPacintes[id].matricula}</td>
                                        <td> {dadosPacintes[id].email}</td>
                                        <td> {dadosPacintes[id].codTurma}</td>

                                        <td>
                                            <a className="btn btn-primary" onClick={() => { setIdAtual(id) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>

                                            <a className="btn btn-danger" onClick={() => deleteCadastro(id)}>
                                                <i className=" far fa-trash-alt"></i>
                                            </a>
                                        </td>

                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Cadastro