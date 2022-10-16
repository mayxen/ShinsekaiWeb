<?php

namespace App\Http\Controllers;

use App\Http\Resources\HomeResource;
use App\Models\City;
use App\Models\Home;
use App\Models\HomePurchaseType;
use App\Models\HomeType;
use App\Mail\NotifyOwner;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class WebController extends Controller
{
    const PURCHASE_COMPRAR = 1;
    const PURCHASE_ALQUILAR = 2;
    const PURCHASE_COMPARTIR = 3;
    const SKIP_TOTAL = 9;

    public function index()
    {
        return Inertia::render('Home', [

        ]);
    }

    public function search()
    {
        $purchaseTypeList = HomePurchaseType::all();
        $homeTypeList = HomeType::all();
        $cities = City::all()->sortBy("name")->pluck("name");
        $homeAlt = HomeResource::collection(Home::InRandomOrder()->take(6)->get());
        $data = Home::inRandomOrder()->get();
        $dataResult = HomeResource::collection($data->take($this::SKIP_TOTAL));

        return Inertia::render('Search', [
            'purchaseTypeList' => $purchaseTypeList,
            'homeTypeList' => $homeTypeList,
            'cities' => $cities,
            'home' => $dataResult,
            'homeAlt' => $homeAlt,
            'page' => 1,
            'lastPage' => floor(count($data) / 9) + 1,
        ]);
    }

    public function searchPost(Request $request)
    {
        $purchaseTypeList = HomePurchaseType::all();
        $homeTypeList = HomeType::all();
        $homeType = $request->homeType;
        $purchaseType = $request->purchaseType;
        $location = $request->location;
        $cities = City::all()->sortBy("name")->pluck("name");
        $data = $this->searchFilterHomes($request);
        $paginatedData = HomeResource::collection($data
            ->skip($request->page ? ($request->page - 1) * $this::SKIP_TOTAL : 0)
            ->take($this::SKIP_TOTAL));
        $homeAlt = HomeResource::collection(Home::InRandomOrder()->take(6)->get());

        return Inertia::render('Search', [
            'purchaseTypeList' => $purchaseTypeList,
            'homeTypeList' => $homeTypeList,
            'homeType' => $homeType,
            'purchaseType' => $purchaseType,
            'location' => $location,
            'cities' => $cities,
            'home' => $paginatedData,
            'homeAlt' => $homeAlt,
            'page' => $request->page ?: 1,
            'lastPage' => (int)(floor(count($data) / $this::SKIP_TOTAL) + 1),
        ]);
    }

    public function profile()
    {
        return Inertia::render('Profile', [

        ]);
    }

    public function about()
    {
        return Inertia::render('Information/About');
    }

    public function contact()
    {
        return Inertia::render('Information/Contact');
    }

    public function privacyPolicy()
    {
        return Inertia::render('Information/PrivacyPolicy');
    }

    public function refunds()
    {
        return Inertia::render('Information/Refunds');
    }

    public function cookies()
    {
        return Inertia::render('Information/Cookies');
    }

    public function sustainability()
    {
        return Inertia::render('Information/Sustainability');
    }

    public function faq()
    {
        return Inertia::render('Information/FAQ');
    }

    public function customerService()
    {
        return Inertia::render('Information/CustomerService');
    }

    public function mailOwner(Request $request)
    {
        $reasonsList = GlobalFunctions::getContactReasonsList();

        $validator = Validator::make($request->all(), [
            'email' => 'required|email:rfc,dns',
            'formChoice' => 'required|min:0|max:' . (count($reasonsList) - 1),
            'name' => 'required',
            'phone_number' => 'required',
            'terms' => 'required',
            'newsletter' => 'required',
            'home' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 500);
        }

        $email = $request->email;
        $name = $request->name;
        $phone_number = $request->phone_number;
        $terms = $request->terms;
        $newsletter = $request->newsletter;

        //cambiar por datos de verdad
        $user = User::find($request->home['user_id']);
        $ownerName = $user->name;
        $idHome = $request->home['id'];
        $homeName = $request->home['title'];
        $reason = $reasonsList[$request->formChoice];

        Mail::to($email)->send(new NotifyOwner($email, $name, $phone_number, $ownerName, $idHome, $homeName, $reason));
        return response()->json(['status' => 'ok'], 200);
    }

    private function getHomesByPurchageType(int $type)
    {
        switch ($type) {
            case $this::PURCHASE_COMPRAR:
                return HomeResource::collection(Home::where('home_purchase_type_id', $this::PURCHASE_COMPRAR)
                    ->orderBy('home_purchase_type_id', 'desc')->take(6)->get());
            case $this::PURCHASE_ALQUILAR:
                return HomeResource::collection(Home::where('home_purchase_type_id', $this::PURCHASE_ALQUILAR)
                    ->orderBy('home_purchase_type_id', 'desc')->take(6)->get());
            case $this::PURCHASE_COMPARTIR:
                return HomeResource::collection(Home::where('home_purchase_type_id', $this::PURCHASE_COMPARTIR)
                    ->orderBy('home_purchase_type_id', 'desc')->take(6)->get());
        }
    }

    private function searchFilterHomes($request)
    {
        $query = Home::query();

        // tipo compra
        if ($request->purchaseType > 0) {
            $query->where('home_purchase_type_id', $request->purchaseType);
        }

        // tipo casa
        if ($request->homeType > 0) {
            $query->where('home_type_id', $request->homeType);
        }

        // localización
        if ($request->location) {
            $query->where('town', $request->location);
        }

        // Habitaciones
        if ($request->rooms > 0) {
            $query->where('rooms', ">", $request->rooms);
        }

        // Dormitorios
        if ($request->bedrooms > 0) {
            $query->where('bedrooms', ">", $request->bedrooms);
        }

        // Baños
        if ($request->bathrooms > 0) {
            $query->where('bathrooms', ">", $request->bathrooms);
        }

        // Año de construccion
        if ($request->construction_year) {
            $query->where('construction_year', ">", $request->construction_year);
        }

        // Metros cuadrados
        if ($request->square_meter) {
            $query->where('square_meter', ">", (int)$request->square_meter);
        }

        // Extras
        if ($request->garage) {
            $query->where('garage', $request->garage);
        }

        if ($request->pets) {
            $query->where('pets', $request->pets);
        }

        if ($request->elevator) {
            $query->where('elevator', $request->elevator);
        }

        if ($request->terrace) {
            $query->where('terrace', $request->terrace);
        }

        if ($request->heating) {
            $query->where('heating', $request->heating);
        }

        if ($request->smoker) {
            $query->where('smoker', $request->smoker);
        }

        if ($request->furnished) {
            $query->where('furnished', $request->furnished);
        }

        if ($request->garden) {
            $query->where('garden', $request->garden);
        }

        // Precio
        if ($request->priceMin != $request->priceMax) {
            if ($request->priceMin > $request->priceMax) {
                if ($request->priceMax == 0) {
                    $query->where('price', '>=', $request->priceMin);
                }
            }
            if ($request->priceMax > $request->priceMin) {
                if ($request->priceMin == 0) {
                    $query->where('price', '<=', $request->priceMax);
                } else {
                    $query->whereBetween('price', [$request->priceMin, $request->priceMax]);
                }
            }
        }
        if ($request->priceMin == $request->priceMax && $request->priceMin > 0 && $request->priceMax > 0) {
            $query->where('price', $request->priceMin);
        }

//        if ($request->sortFilter) {
//            if ($request->sortFilter == 0) //destacados
//                $query->orderByDesc("highlight");
//            if ($request->sortFilter == 1) //nombre a-z
//                $query->orderBy("name");
//            if ($request->sortFilter == 2) //nombre z-a
//                $query->orderByDesc("name");
//            if ($request->sortFilter == 3) //precio menos<mas
//                $query->orderBy("price");
//            if ($request->sortFilter == 4) //precio mas>menos
//                $query->orderByDesc("price");
//            if ($request->sortFilter == 5) //novedades primero
//                $query->orderByDesc("created_at");
//        }
//
        return $query->get();
    }
}
