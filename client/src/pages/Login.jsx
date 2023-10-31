import {
	Link,
	Form,
	redirect,
	useActionData,
	useNavigate,
} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	////access to form data to display it in form
	// const errors = { msg: '' };
	// if (data.password.length < 3) {
	// 	errors.msg = 'password < 3';
	// 	return errors;
	// }
	try {
		await customFetch.post('/auth/login', data);
		toast.success('Login successful');
		return redirect('/dashboard');
	} catch (err) {
		toast.error(err?.response?.data?.msg);
		//errors.msg = err?.response?.data?.msg;
		return errors;
	}
};

const Login = () => {
	//const errors = useActionData();
	const navigate = useNavigate();
	const loginDemoUser = async () => {
		const data = {
			email: 'test@test.com',
			password: 'secret123',
		};
		try {
			await customFetch.post('auth/login', data);
			toast.success('Take a test drive');
			return navigate('/dashboard');
		} catch (err) {
			toast.error(err?.response?.data?.msg);
			return err;
		}
	};
	return (
		<Wrapper>
			<Form method='post' className='form'>
				<Logo />
				<h4>Login</h4>
				{/* {errors?.msg && <p style={{ color: 'red' }}>{errors.msg}</p>} */}
				<FormRow type='email' name='email' />
				<FormRow type='password' name='password' />
				<SubmitBtn />
				<button type='button' className='btn btn-block' onClick={loginDemoUser}>
					explore the app
				</button>
				<p>
					Not a member yet?{' '}
					<Link to='/register' className='member-btn'>
						Register
					</Link>
				</p>
			</Form>
		</Wrapper>
	);
};
export default Login;
