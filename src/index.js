import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { JobsListsPovider } from './routes/context/staff.context';
import { JobsListsProviderEmp } from './routes/context/empStaff.context';
import { loadStripe } from '@stripe/stripe-js';

ReactDOM.render(<div>
    <BrowserRouter>
    <JobsListsPovider>
    <JobsListsProviderEmp>
        <App />
    </JobsListsProviderEmp>
    </JobsListsPovider>
    </BrowserRouter>
</div>
, document.getElementById('root'));
