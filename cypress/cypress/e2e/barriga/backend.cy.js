/// <reference types="cypress" />

describe('Teste funcional', () => {
    let token
    beforeEach(() => {
        cy.getToken('onoffjunior@gmail.com', '#@Barriga')
            .then(tkn => {
                token = tkn
            })

        cy.resetRest()    
    })

    it('Criar conta', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta via rest'
            }
        }).as('response')


        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.be.have.property('id')
            expect(res.body).to.be.have.property('nome', 'Conta via rest')
        })
    })



    it('criar conta com o mesmo nome', () => {

    })

    it('Salvando Movimentos', () => {

    })

    it('Consultar saldo', () => {

    })

    it('Remover movimento', () => {

    })

    it('Excluir conta', () => {

    })
})


