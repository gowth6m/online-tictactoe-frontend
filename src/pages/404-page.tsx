import { Link } from "react-router-dom";

export default function Page404() {
    return (
        <div className="flex flex-col justify-center items-center w-full text-center my-24">
            <h1 className="text-8xl mb-4 text-accent">404</h1>
            <p className="mb-4 text-xl">
                Page not found!
                <span role="img" aria-label="sad">
                    {" "}
                    😢
                </span>
            </p>

            <Link className="btn btn-primary btn-wide" role="button" to="/">
                Go back to home
            </Link>
        </div>
    );
}
