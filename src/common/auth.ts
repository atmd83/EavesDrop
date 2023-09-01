import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class Auth extends PassportStrategy(Strategy) {
    public validate = async (username, password): Promise<boolean> => {
        const {BLACKLIST_USER, BLACKLIST_PASS} = process.env;
        if (BLACKLIST_USER === username && BLACKLIST_PASS === password) {
            return true;
        }
        throw new UnauthorizedException();
    }
}