# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="https://www.inteli.edu.br/wp-content/uploads/2021/08/20172028/marca_1-2.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

# HU payments

## Weberts

## Integrantes: <a href="https://github.com/Bianca-Cassemiro">Bianca Cassemiro Lima</a>, <a href="https://www.linkedin.com/in/victorbarq/">Luiz Francisco Granville Gonçalves</a>, <a href="https://www.linkedin.com/in/victorbarq/">Oliver Gomes da Silva</a>, <a href="https://github.com/yRoMao">Pedro Romão Cerdeira Dias</a>, <a href="https://www.linkedin.com/in/victorbarq/">Theo Albero Tosto</a>, <a href="https://github.com/WagnerBarcelos">Wagner Estevam Barcelos da Silva</a>

## Descrição

📜 O Hurb é uma empresa que tem como missão simplicar o jeito de viajar, cujo principal produto é a venda de diárias em hotéis. Nesse sentido, os hotéis parceiros recebem o dinheiro da estadia 30 dias após o check-out do cliente. Ainda nessa linha de raciocínio, o Hurb oferece opcões de antecipação desse pagamento em D+2, D+7 e D+15, em que são descontados uma porcentagem sobre o valor total (12%, 9% e 6%, respectivamente). Atualmente, esse processo de antecipação é manual e pouco explorado, pois menos de 5% dos hotéis conhecem e utilizam esse serviço. Dessa forma, o projeto tem como objetivo automatizar esse processo, de modo que fique mais fácil, rápido e que mais pessoas tenham acesso. Além disso, os administradores do Hurb poderão ver informações sobre todas essas antecipações feitas para aumentar ainda mais a produtividade do time de contas a pagar.
<br><br>
<p align="center">
<img src="https://github.com/2022M2T4/Projeto2/blob/main/imagens/logo-hurb.jpg" alt="Logo Hurb" border="0"><br>
  
<br><br>
Nossa solução para a automatização do processo de antecipação de pagamentos é um sistema web, em que os parceiros, em um único lugar, tenham todas as informações necessárias sobre o produto, saibam como realizar o processo e que possam ter dados sobre essas antecipações para uma melhor organização. Para isso, o parceiro começa numa tela de acesso, onde deve colocar seu login e senha(já cadastrados previamente no sistema) para ser direcionado ao dashboard. No dashboard, poderá ser visualizado 4 áreas principais: Solicitar antecipação, Finanças, Histórico e Informações sobre antecipações. Ainda nessa tela, o parceiro poderá ver seus hotéis (pois consideramos que uma pessoa pode possuir vários) e seus dados pessoais e bancários. A parte de informações sobre as antecipações explicam sobre as regras de negócios e as áreas de finanças e histórico revelam dados referentes a todas as antecipações passadas e futuras. A parte principal, de solicitar a antecipação, o hoteleiro pode visualizar as reservas com o valor de cada uma delas e terá a opção de selecionar todas elas de uma só vez para facilitar o processo. Após isso, ele verá o montante e confirmará os dados bancários para que a antecipação seja feita de fato.
  
<br>
  
Na mesma tela de acesso do parceiro, o Hurb terá um login e senha para acessarem as projeções das antecipações de todos os hotéis parceiros. Nessas projeções, poderão ser vistos dados como os hotéis que mais antecipam reservas, qual a regra de negócio mais pedida, quais estados se destacam, rentabilidade, além comparativos relacionados aos meses/anos anteriores.

## 🛠 Estrutura de pastas
  
-Raiz<br>
|<br>
|-->documentos<br>
  &emsp;|-->antigos<br>
  &emsp;|Documentação.pdf<br>
|-->imagens<br>
|-->src<br>
  &emsp;|frontend<br>
  &emsp;|backend<br>
|README.md<br>
  
 3 principais pastas:
  
  <b>documentos</b>: Aqui estarão os documentos do projeto, mas principalmente o WAD. Há uma pasta chamada antigos onde estarão todas as versões anteriores da documentação atualizada.

  <b>imagens</b>: Imagem da logo do Hurb.
  
  <b>src</b>: Nesta pasta irá todo o código fonte do jogo/sistema, pronto para para ser baixado e modificado. Existem duas pastas: Backend(que contém o código do servidor) e Frontend(que contém o código da página web).
  
  ## 📈 Exemplo de uso
  
  A plataforma HU Payments será útil para a organização financeira dos hoteleiros, assim como para o Hurb, e poderá ser utilizado como modelo de automatização de outros possíveis produtos da empresa. 
  
  
  ## 💻 Configuração para Desenvolvimento

Para abrir esta aplicação web você precisa abrir o terminal do seu computador e entrar na pasta do projeto. Após isso, execute os comandos: 
  ```sh
npm install express
```
  
   ```sh
npm install sqlite3
```
  Por fim, rode:
   ```sh
node index.js
```
 
  ## 🗃 Histórico de lançamentos
  
* 0.1.8 - 13/06/2022
    * MUDANÇA: Backend da página do ADM
* 0.1.7 - 12/06/2022
    * MUDANÇA: Adição da página de editar dados
* 0.1.6 - 10/06/2022
    * MUDANÇA: Integração frontend + backend de algumas telas e conserto dos redirecionamentos da página de antecipação
* 0.1.5 - 07/06/2022
    * MUDANÇA: Mudanças nas telas principais, principalmente no dashboard e delete de algumas coisas que não faziam mais sentido no projeto.
* 0.1.4 - 05/06/2022
    * MUDANÇA: Adição de mais telas sobre informações sobre as antecipações e pie chart com dados da database
* 0.1.3 - 04/06/2022
    * MUDANÇA: Atualização do WAD com documentação do Postman
* 0.1.2 - 03/06/2022
    * MUDANÇA: Atualização do WAD e do modelo conceitual e lógico do parceiro
* 0.1.1 - 02/06/2022
    * MUDANÇA: Inserção de novo banco de dados do parceiro
* 0.1.0 - 29/05/2022
    * MUDANÇA: Atualização do WAD
* 0.0.9 - 27/05/2022
    * MUDANÇA: Backend do projeto
* 0.0.8 - 13/05/2022
    * MUDANÇA: Adição do menu do dashboard
* 0.0.7 - 12/05/2022
    * MUDANÇA: Alocação da tela de montante na pasta certa, comentários nos códigos na tela reserva/montante e adição da página de login
* 0.0.6 - 11/05/2022
    * MUDANÇA: Mudanças no dashboard, lançamento da tela de antecipação por montante e reestruturação das pastas e refatoração dos códigos.
* 0.0.5 - 10/05/2022
    * MUDANÇA: Organização das pastas, lançamento do dashboard e atualizações do histórico.
* 0.0.4 - 09/05/2022
    * MUDANÇA: Mudanças e estilização da tela do financeiro.
* 0.0.3 - 05/05/2022
    * MUDANÇA: Tela do financeiro feita
* 0.0.2 - 02/05/2022
    * MUDANÇA: Lançamento do storyboard e wireframe do projeto.
* 0.0.1 - 22/04/2022
    * Começo do nosso repositório.
  
 ## 📋 Licença/License

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Spidus/Teste_Final_1">MODELO GIT INTELI</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.yggbrasil.com.br/vr">INTELI, VICTOR BRUNO ALEXANDER ROSETTI DE QUIROZ</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>

## 🎓 Referências

Aqui estão as referências usadas no projeto.

1. <https://github.com/iuricode/readme-template>
2. <https://github.com/gabrieldejesus/readme-model>
3. <https://creativecommons.org/share-your-work/>


