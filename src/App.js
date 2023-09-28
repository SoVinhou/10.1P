import HomePage from './routes/HomePage';
import { Route, Routes } from 'react-router-dom';
import LogInPage from './routes/LogInPage';
import CreateAccountPage from './routes/CreateAccountPage';
import FindDevPage from './routes/FindDevPage';
import FindJobPage from './routes/FindJobPage';
import ListJobsPage from './routes/ListJobsPage';
import ProfilePage from './routes/ProfilePage';
import StripeContainer from './payment/StripeContainer';
import ThankYouPage from './routes/ThankYouPage';

function App() {
    return (
        <Routes>
            <Route path='/' element={ <HomePage /> } />
            <Route path='/LogIn' element={ <LogInPage /> } />
            <Route path='/CreateAccount' element={ <CreateAccountPage /> } />
            <Route path='/FindDev' element={ <FindDevPage /> } />
            <Route path='/FindJob' element={ < FindJobPage /> } />
            <Route path='/ListJob' element={ < ListJobsPage />} />
            <Route path='/Profile' element={ <ProfilePage /> } />
            <Route path='/PaymentForm' element={ <StripeContainer /> } />
            <Route path='/PurchaseCompletion' element={ <ThankYouPage /> } />
        </Routes>
    );
}

export default App;