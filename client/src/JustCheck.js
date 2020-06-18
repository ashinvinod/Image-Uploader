import React, {useEffect, useState} from 'react'

const App2 = () => {
	const [response, setResponse] = useState('')
	const [post, setPost] = useState('')
	const [responseToPost, setResponseToPost] = useState('')

	useEffect(() => {

		async function callApi()  {
			const response = await fetch('/api/hello');
			const body = await response.json();
			if (response.status !== 200) throw Error(body.message);
			return body;
		};
		callApi()
			.then(res => this.setState({ response: res.express }))
			.catch(err => console.log(err));

	})

	return(
		<div>
			{JSON.stringify(response)}
		</div>
	)
}

export default App2
