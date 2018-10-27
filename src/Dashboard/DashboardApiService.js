//
//  DashboardApiService
//  stride-assignment
//
//  Created by nidhitandon on 25/10/18 10:25 PM
//  Copyright © 2018 stride-assignment. All rights reserved.
//
//  Keep up the good work :)
//

import axios from 'axios';


export default function getDashboardData() {
   return axios.get('dashboard.json').then((response) => {
        console.log(response)
        return response
    }).catch((error) => {
        console.log(error)
    })
}


