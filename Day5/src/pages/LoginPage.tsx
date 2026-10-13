function LoginPage() {
    return (
        <main className="login-page">
            <section className="login-container">
                <h1>Welcome Back</h1>
                <p>Sign in to your account to continue</p>

                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button type="submit">Sign In</button>
                </form>
            </section>
        </main>
    )
}

export default LoginPage