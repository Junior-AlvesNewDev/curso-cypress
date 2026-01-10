/// <reference types="cypress" />

describe('Teste funcional', () => {
    beforeEach(() => {
        //cy.login('onoffjunior@gmail.com', '#@Barriga')        
    })


    it('Criar conta', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: 'onoffjunior@gmail.com',
                redirecionar: false,
                senha: '#@Barriga'
            }
        }).its('body.token').should('not.be.empty')
            .then(token => {
                cy.request({
                    url:'https://barrigarest.wcaquino.me/contas',
                    method: 'POST',
                    headers: {Authorization: `JWT ${token}`},
                    body: {
                        nome: 'Conta via rest'
                    }
                }).as('response')
            })        

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


