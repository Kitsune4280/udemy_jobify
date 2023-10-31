import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { redirect } from 'react-router-dom';

export const action = async ({ params }) => {
	try {
		await customFetch.delete(`/jobs/${params.id}`);
		toast.success('Job deleted successfully');
	} catch (err) {
		toast.error(err?.response?.data?.msg);
		console.log(err);
	}
	return redirect('/dashboard/all-jobs');
};
const DeleteJob = () => {
	return (
		<div>
			<h1>DeleteJob</h1>
		</div>
	);
};
export default DeleteJob;
