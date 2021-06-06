import { All, Controller } from '@nestjs/common';

@Controller()
export class AppController {

    @All()
    catchAll(){
        console.log("catch all route reached")
    }
}
