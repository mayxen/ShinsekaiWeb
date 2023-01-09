<?php

namespace App\Http\Controllers;

use App\Http\Resources\GalleryResource;
use App\Mail\NotifyOwner;
use App\Models\Gallery;
use App\Models\LocalEvent;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class WebController extends Controller
{
    const FEEDTYPES = ['events', 'news', 'gallery'];
    const PURCHASE_COMPRAR = 1;
    const PURCHASE_ALQUILAR = 2;
    const PURCHASE_COMPARTIR = 3;
    const SKIP_TOTAL = 9;

    public function index()
    {
        $homeElements = [];
        $homeElements[] = GalleryResource::collection(Gallery::where("visible", true)->get());
        $homeElements[] = LocalEvent::where("visible", true)->get();
        $homeElements[] = News::where("visible", true)->get();
        return Inertia::render('Home', [
            'homeElements' => $homeElements
        ]);
    }

    public function feeds($feed)
    {

        if ($this->checkFeed($feed)) {
            $feedData = $this->getFeeds($feed);
            return Inertia::render('Feed', [
                'title' => $feed,
                'data' => $feedData
            ]);

        } else {
            //TODO Pagina error
        }
    }

    public function feed($feed, $id)
    {

        if ($this->checkFeed($feed)) {
           $feedData = $this->getFeed($feed, $id);
            return Inertia::render('FeedShow', [
                'title' => $feed,
                'data' => $feedData,
            ]);

        } else {
            //TODO Pagina error
        }
    }

    private function checkFeed($feed)
    {
        return in_array($feed, WebController::FEEDTYPES);
    }

    private function getFeeds($feed)
    {
        switch ($feed) {
            case 'events':
                return LocalEvent::where("visible", true)->id();
            case 'news':
                return News::where("visible", true)->get();
            case 'gallery':
                return GalleryResource::collection(Gallery::where("visible", true)->get());
        }
    }

    private function getFeed($feed, $id)
    {
        switch ($feed) {
            case 'events':
                return LocalEvent::where("visible", true)->find($id);
            case 'news':
                return News::where("visible", true)->find($id);
            case 'gallery':
                return GalleryResource::collection(Gallery::where("visible", true)->where("id",$id)->get());
        }
    }


//    public function mailOwner(Request $request)
//    {
//        $reasonsList = GlobalFunctions::getContactReasonsList();
//
//        $validator = Validator::make($request->all(), [
//            'email' => 'required|email:rfc,dns',
//            'formChoice' => 'required|min:0|max:' . (count($reasonsList) - 1),
//            'name' => 'required',
//            'phone_number' => 'required',
//            'terms' => 'required',
//            'newsletter' => 'required',
//            'home' => 'required',
//        ]);
//        if ($validator->fails()) {
//            return response()->json(['errors' => $validator->errors()], 500);
//        }
//
//        $email = $request->email;
//        $name = $request->name;
//        $phone_number = $request->phone_number;
//        $terms = $request->terms;
//        $newsletter = $request->newsletter;
//
//        //cambiar por datos de verdad
//        $user = User::find($request->home['user_id']);
//        $ownerName = $user->name;
//        $idHome = $request->home['id'];
//        $homeName = $request->home['title'];
//        $reason = $reasonsList[$request->formChoice];
//
//        Mail::to($email)->send(new NotifyOwner($email, $name, $phone_number, $ownerName, $idHome, $homeName, $reason));
//        return response()->json(['status' => 'ok'], 200);
//    }
}
