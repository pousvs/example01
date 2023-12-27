<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transection;

class ReportController extends Controller
{
    //

    public function __construct(){
        $this->middleware('auth:api');
    }

    public function created_report(Request $request){

        $month_type = $request->month_type;
        $dmy = $request->dmy;

        $month = explode("-",$dmy)[1];
        $year = explode("-",$dmy)[0];

        $labels = [];
        $income = [];
        $expense = [];

        if($month_type == 'm'){

            // ຊອກຫາວັນທີ່ສຸດທ້າຍຂອງເດືອນ
            $last_day = date("t",strtotime($dmy));
            //return $last_day;

            for ($i=1; $i <=$last_day ; $i++) { 
                array_push($labels,"ວັນທີ່ ".$i);
            }

            // ດຶງຂໍ້ມູນລາຍຮັບ ແຕ່ລ່ະວັນທີ່ ແລ້ວເພີ່ມເຂົ້າໃນ $income
            for ($i=1; $i <=$last_day ; $i++) { 
                $inc = Transection::whereMonth("created_at",$month)
                ->whereYear("created_at",$year)
                ->whereDay("created_at",$i)
                ->where("tran_type","income")
                ->sum("price");
                // ເພີ່ມເຂົ້າ $income
                array_push($income,$inc);
            }

            $sum_income = Transection::whereMonth("created_at",$month)
            ->whereYear("created_at",$year)
            ->where("tran_type","income")
            ->sum("price");

            // ດຶງຂໍ້ມູນລາຍຈ່າຍ ແຕ່ລ່ະວັນທີ່ ແລ້ວເພີ່ມເຂົ້າໃນ $expense
            for ($i=1; $i <=$last_day ; $i++) { 
                $exp = Transection::whereMonth("created_at",$month)
                ->whereYear("created_at",$year)
                ->whereDay("created_at",$i)
                ->where("tran_type","expense")
                ->sum("price");
                // ເພີ່ມເຂົ້າ $income
                array_push($expense,$exp);
            }

            $sum_expense = Transection::whereMonth("created_at",$month)
            ->whereYear("created_at",$year)
            ->where("tran_type","expense")
            ->sum("price");
     

        } else if($month_type == 'y'){
            

    
  
              for ($i=1; $i <=12 ; $i++) { 
                  array_push($labels,"ເດືອນ ".$i);
              }
  
              // ດຶງຂໍ້ມູນລາຍຮັບ ແຕ່ລ່ະວັນທີ່ ແລ້ວເພີ່ມເຂົ້າໃນ $income
              for ($i=1; $i <=12 ; $i++) { 
                  $inc = Transection::whereMonth("created_at",$i)
                  ->whereYear("created_at",$year)
                  ->where("tran_type","income")
                  ->sum("price");
                  // ເພີ່ມເຂົ້າ $income
                  array_push($income,$inc);
              }
  
              $sum_income = Transection::whereYear("created_at",$year)
              ->where("tran_type","income")
              ->sum("price");
  
              // ດຶງຂໍ້ມູນລາຍຈ່າຍ ແຕ່ລ່ະວັນທີ່ ແລ້ວເພີ່ມເຂົ້າໃນ $expense
              for ($i=1; $i <=12 ; $i++) { 
                  $exp = Transection::whereMonth("created_at",$i)
                  ->whereYear("created_at",$year)
                  ->where("tran_type","expense")
                  ->sum("price");
                  // ເພີ່ມເຂົ້າ $income
                  array_push($expense,$exp);
              }
  
              $sum_expense = Transection::whereYear("created_at",$year)
              ->where("tran_type","expense")
              ->sum("price");
        }



        $response = [
            "labels" => $labels,
            "income" => $income,
            "expense" => $expense,
            "sum_income" => $sum_income,
            "sum_expense" => $sum_expense,
        ];
        
        return response()->json($response);
    }
}