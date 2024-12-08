import {withAuth} from "next-auth/middleware";
import {NextRequest, NextResponse} from "next/server";

export default withAuth(
    async function middleware(request: NextRequest) {
        const token = request.cookies.get('token')?.value;
        //Redirect root path to sign in page
        if (request.nextUrl.pathname === '/') {
            //If the user is logged in then redirect to dashboard
            if (token) {
                return NextResponse.redirect(new URL("/application/dashboard", request.url));
            }

            //If the user is not logged in then redirect to log in page
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        //If the user is not authentication and trying to access protected routes
        if(!token && request.nextUrl.pathname.startsWith('/application')) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    },
    {
        callbacks:{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            authorized({token}) {
                return true; //Let the middleware function handle the authorization
            },
        },
    },
);

export const config = {
    matcher: ["/", "/application/:path*"]
};