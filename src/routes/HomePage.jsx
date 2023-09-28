import React from 'react';
import NavBar from '../NavBar';
import Cover from '../Cover';
import Freelancers from '../Freelancers';
import CardsLists from '../CardsLists';
import Customers from '../Customers';
import CustomersCardsLists from '../CustomersCardsLists';
import Button from '../Button';
import ButtonFL from '../ButtonFL';
import EmailBox from '../EmailBox';
import Bottom from '../Bottom';

function HomePage() {
  return (
    <div>
        <NavBar />
        <Cover />
        <Freelancers 
            text = "Featured Freelancers"
        />
        <CardsLists />
        <ButtonFL/>
        <Customers 
            text = "Featured Customers"
        />
        <CustomersCardsLists />
        <Button/>
        <EmailBox />
        <Bottom />
    </div>
  );
}

export default HomePage;