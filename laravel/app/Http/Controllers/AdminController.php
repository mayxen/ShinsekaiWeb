<?php

namespace App\Http\Controllers;

use App\Http\Resources\HomeImageResource;
use App\Http\Resources\GalleryResource;
use App\Models\Gallery;
use App\Models\GalleryImage;
use App\Models\LocalEvent;
use App\Models\News;
use App\Models\User;
use Dnsimmons\Imager\Imager;
use http\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AdminController extends Controller
{
    const NEW = "New";
    const EVENT = "Event";
    const GALLERY = "Gallery";
    const ADMIN = "Admin";

    // Obtener todos los datos de cada vista
    public function indexPaperbase()
    {
        $users = $this->getAllUsers();
        $news = News::all();
        $events = LocalEvent::all();
        $galleries = $this->getGallery();
        return Inertia::render('Admin/Paperbase', [
            "users" => $users,
            "news" => $news,
            "events" => $events,
            "galleries" => $galleries,
        ]);
    }

    ################ USERS ########################################

    // Añadir un nuevo usuario
    public function addUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'bail|required|string|max:255',
            'email' => 'required|email:rfc,dns|unique:users',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 500);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $licences = [];
        if ($request->isAdmin) {
            $licences[] = GlobalFunctions::IdLicenceAdmin;
        }
        if ($request->isGallery) {
            $licences[] = GlobalFunctions::IdLicenceGallery;
        }
        if ($request->isEvent) {
            $licences[] = GlobalFunctions::IdLicenceEvent;
        }
        if ($request->isNew) {
            $licences[] = GlobalFunctions::IdLicenceNew;
        }

        $user->licenses()->attach($licences);

        return $this->getAllUsers();
    }

    // Modificar un usuario
    public function updateUser(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'bail|required|string|max:255',
            'email' => 'required|email:rfc,dns',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 500);
        }

        $user = User::find($id);

        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->password != "") {
            $user->password = Hash::make($request->password);
        }

        $user->save();
        $user->licenses()->detach();
        $licences = [];
        if ($request->isAdmin) {
            $licences[] = GlobalFunctions::IdLicenceAdmin;
        }
        if ($request->isGallery) {
            $licences[] = GlobalFunctions::IdLicenceGallery;
        }
        if ($request->isEvent) {
            $licences[] = GlobalFunctions::IdLicenceEvent;
        }
        if ($request->isNew) {
            $licences[] = GlobalFunctions::IdLicenceNew;
        }

        $user->licenses()->attach($licences);

        return $this->getAllUsers();
    }

    // Borrar un usuario
    public function deleteUser($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json($user);
    }

    private function getAllUsers()
    {
        $users = User::get(['id', 'name', 'email']);

        foreach ($users as $user) {
            if (isset($user->licenses)) {
                $user['isAdmin'] = GlobalFunctions::checkUserHasLicence($user->licenses);
                $user['isGallery'] = GlobalFunctions::checkUserHasLicence($user->licenses, GlobalFunctions::LicenceGallery);
                $user['isEvent'] = GlobalFunctions::checkUserHasLicence($user->licenses, GlobalFunctions::LicenceEvent);
                $user['isNew'] = GlobalFunctions::checkUserHasLicence($user->licenses, GlobalFunctions::LicenceNew);
            }
        }
        return $users;
    }

    ########### NOTICIAS ########################################

    public function addNew(Request $request)
    {
        $newData = json_decode($request->new);
        $uploadFile = $request->file('file');
        $file_name = $uploadFile->hashName();
        try {
            if ($uploadFile) {
                $imager = new Imager($uploadFile); //TODO cuando tengamos el icono poner la watermark
//                $imager->watermark(storage_path("/app/public/watermark.png"), 'bottom-right')->write(storage_path("/app/public/$file_name"));
                $imager->write(storage_path("/app/public/$file_name"));
            }
            News::create([
                'title' => $newData->title,
                'resume' => $newData->resume,
                'description' => $newData->description,
                'visible' => $newData->visible,
                'image' => $file_name,
            ]);

            return News::all();
        } catch (Exception $e) {
            Storage::disk('public')->delete("/app/public/$file_name");
            return response()->json(['error' => "Hubo un error en la subida por {
                $e->getMessage()}"]);
        }
    }

    public function updateNew(Request $request, $id)
    {
        $uploadFile = $request->file('file');
        $new = News::find($id);
        try {
            if ($uploadFile) {
                $file_name = $uploadFile->hashName();
                Storage::disk('public')->delete($new->image);
                $imager = new Imager($uploadFile); //TODO cuando tengamos el icono poner la watermark
//                $imager->watermark(storage_path("/app/public/watermark.png"), 'bottom-right')->write(storage_path("/app/public/$file_name"));
                $imager->write(storage_path("/app/public/$file_name"));
                $new->image = $file_name;
            }
            $newData = json_decode($request->new);
            $new->title = $newData->title;
            $new->resume = $newData->resume;
            $new->description = $newData->description;
            $new->visible = $newData->visible;
            $new->save();

            return News::all();
        } catch (Exception $e) {
            return response()->json(['error' => "Hubo un error en la subida por {
                $e->getMessage()}"]);
        }
    }

    public function deleteNew($id)
    {
        $new = News::find($id);
        $new->delete();
        return response()->json($new);
    }

    public function restoreNew($id)
    {
        $new = News::withTrashed()->find($id);
        $new->restore();
        return response()->json($new);
    }

    public function trueDeleteNew($id)
    {
        $new = News::withTrashed()->find($id);
        Storage::disk('public')->delete($new->image);
        $new->forceDelete();
        return response()->json($new);
    }

    public function toggleTrashedNew(Request $request)
    {
        return $request->isWithTrashed ? News::withTrashed()->get() : News::all();
    }

    ########### EVENT ########################################
    public function addEvent(Request $request)
    {
        $eventData = json_decode($request->localEvent);
        $uploadFile = $request->file('file');
        $file_name = $uploadFile->hashName();
        try {
            if ($uploadFile) {
                $imager = new Imager($uploadFile); //TODO cuando tengamos el icono poner la watermark
//                $imager->watermark(storage_path("/app/public/watermark.png"), 'bottom-right')->write(storage_path("/app/public/$file_name"));
                $imager->write(storage_path("/app/public/$file_name"));
            }
            LocalEvent::create([
                'title' => $eventData->title,
                'resume' => $eventData->resume,
                'description' => $eventData->description,
                'visible' => $eventData->visible,
                'image' => $file_name,
            ]);

            return LocalEvent::all();
        } catch (Exception $e) {
            Storage::disk('public')->delete("/app/public/$file_name");
            return response()->json(['error' => "Hubo un error en la subida por {
                $e->getMessage()}"]);
        }
    }

    public function updateEvent(Request $request, $id)
    {
        $uploadFile = $request->file('file');
        $event = LocalEvent::find($id);
        try {
            if ($uploadFile) {
                $file_name = $uploadFile->hashName();
                Storage::disk('public')->delete($event->image);
                $imager = new Imager($uploadFile); //TODO cuando tengamos el icono poner la watermark
//                $imager->watermark(storage_path("/app/public/watermark.png"), 'bottom-right')->write(storage_path("/app/public/$file_name"));
                $imager->write(storage_path("/app/public/$file_name"));
                $event->image = $file_name;
            }
            $eventData = json_decode($request->localEvent);
            $event->title = $eventData->title;
            $event->resume = $eventData->resume;
            $event->description = $eventData->description;
            $event->visible = $eventData->visible;
            $event->save();

            return LocalEvent::all();
        } catch (Exception $e) {
            return response()->json(['error' => "Hubo un error en la subida por {
                $e->getMessage()}"]);
        }
    }

    public function deleteEvent($id)
    {
        $event = LocalEvent::find($id);
        $event->delete();
        return response()->json($event);
    }


    public function trueDeleteEvent($id)
    {
        $event = LocalEvent::withTrashed()->find($id);
        Storage::disk('public')->delete($event->image);
        $event->forceDelete();
        return response()->json($event);
    }

    public function restoreEvent($id)
    {
        $event = LocalEvent::withTrashed()->find($id);
        $event->restore();
        return response()->json($event);
    }

    public function toggleTrashedEvent(Request $request)
    {
        return $request->isWithTrashed ? LocalEvent::withTrashed()->get() : LocalEvent::all();
    }

    ########### END EVENT ########################################
    ########### GALLERY ########################################

    public function addGallery(Request $request)
    {
        $galleryData = json_decode($request->Gallery);
        $uploadFiles = $request->allFiles();
        $gallery = Gallery::create([
            'title' => $galleryData->title,
            'resume' => $galleryData->resume,
            'description' => $galleryData->description,
            'visible' => $galleryData->visible,
            'eventDate' => $galleryData->date,
        ]);
        try {
            if ($uploadFiles) {
                foreach ($uploadFiles as $uploadFile) {
                    $file_name = $uploadFile->hashName();
                    $imager = new Imager($uploadFile); //TODO cuando tengamos el icono poner la watermark
                    //                $imager->watermark(storage_path("/app/public/watermark.png"), 'bottom-right')->write(storage_path("/app/public/$file_name"));
                    $imager->write(storage_path("/app/public/$file_name"));
                    GalleryImage::create([
                        'url' => $file_name,
                        'galleries_id' => $gallery->id,
                        'visible' => true,
                    ]);
                }
            }

            return $this->getGallery();
        } catch (Exception $e) {
            return response()->json(['error' => "Hubo un error en la subida por {
                $e->getMessage()}"]);
        }
    }

    public function updateGallery(Request $request, $id)
    {
        $uploadFiles = $request->allFiles();
        $gallery = Gallery::find($id);
        try {
            if ($uploadFiles) {
                foreach ($uploadFiles as $uploadFile) {
                    $file_name = $uploadFile->hashName();
                    $imager = new Imager($uploadFile); //TODO cuando tengamos el icono poner la watermark
                    //                $imager->watermark(storage_path("/app/public/watermark.png"), 'bottom-right')->write(storage_path("/app/public/$file_name"));
                    $imager->write(storage_path("/app/public/$file_name"));
                    GalleryImage::create([
                        'url' => $file_name,
                        'galleries_id' => $gallery->id,
                        'visible' => true,
                    ]);
                }

                $gallery->image = $file_name;
            }
            $galleryData = json_decode($request->Gallery);
            $gallery->title = $galleryData->title;
            $gallery->resume = $galleryData->resume;
            $gallery->description = $galleryData->description;
            $gallery->visible = $galleryData->visible;
            $gallery->eventDate = $galleryData->date;
            $gallery->save();

            return $this->getGallery();
        } catch (Exception $e) {
            return response()->json(['error' => "Hubo un error en la subida por {
                $e->getMessage()}"]);
        }
    }

    public function deleteGallery($id)
    {
        $gallery = Gallery::find($id);
        $gallery->delete();
        return response()->json($gallery);
    }

    public function restoreGallery($id)
    {
        $gallery = Gallery::withTrashed()->find($id);
        $gallery->restore();
        return response()->json($gallery);
    }

    public function trueDeleteGallery($id)
    {
        $gallery = Gallery::withTrashed()->find($id);
        foreach ($gallery->images as $image) {
            Storage::disk('public')->delete($image->url);
            $image->forceDelete();
        }

        $gallery->forceDelete();
        return response()->json($gallery);
    }

    public function toggleTrashedGallery(Request $request)
    {
        return $request->isWithTrashed ? $this->getGallery(true) : $this->getGallery();
    }

    private function getGallery($withTrashed = false)
    {
        return $withTrashed ? GalleryResource::collection(Gallery::withTrashed()->get()) : GalleryResource::collection(Gallery::all());
    }

    public function deleteGalleryImage($id)
    {
        $image = GalleryImage::find($id);
        Storage::disk('public')->delete($image->url);
        $image->forceDelete();
        return response()->json($image);
    }

    ########### END GALLERY ########################################
    // Añadir un nuevo tipo de casa
    public function addHomeType(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'bail|required|string|unique:home_types|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 500);
        }

        $homeType = HomeType::create([
            'type' => $request->type,
        ]);

        $userAuth = Auth::user();
        GlobalFunctions::createLog("$userAuth->name ha creado el tipo de casa $homeType->type", $userAuth->id);

        $types = HomeType::all();
        return $types;
    }

    // Modificar un tipo de casa
    public function updateHomeType(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'bail|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 500);
        }

        $homeType = HomeType::find($id);

        $homeType->type = $request->type;

        $homeType->save();

        $userAuth = Auth::user();
        GlobalFunctions::createLog("$userAuth->name ha modificado el tipo de casa $homeType->type", $userAuth->id);

        $types = HomeType::all();
        return $types;
    }

    // Borrar un tipo de casa
    public function deleteHomeType($id)
    {
        $homeType = HomeType::find($id);

        $userAuth = Auth::user();
        GlobalFunctions::createLog("$userAuth->name ha eliminado el tipo de casa $homeType->type", $userAuth->id);

        $homeType->delete();

        return response()->json($homeType);
    }

    ################ HOMES ########################################

    // Obtener casas después de añadir una nueva
    public function getHomes()
    {
        $homes = GalleryResource::collection(Home::all());
        return $homes;
    }

    // Añadir una casa antes de subir imágenes (Temporalmente en caso de cancelar)
    public function storeHomeBeforeAddImages(Request $request)
    {
        $home = Home::create([
            'user_id' => Auth::id(),
            "title" => $request->title,
            "resume" => $request->resume,
            "description" => $request->description,
            "price" => $request->price,
            "period_type" => $request->period_type,
            'home_type_id' => $request->home_type_id,
            "home_purchase_type_id" => $request->home_purchase_type_id,
            "square_meter" => $request->square_meter,
            "construction_year" => date("Y", strtotime($request->construction_year)),
            "garage" => $request->garage,
            "pets" => $request->pets,
            "elevator" => $request->elevator,
            "terrace" => $request->terrace,
            "garden" => $request->garden,
            "smoker" => $request->smoker,
            "furnished" => $request->furnished,
            "heating" => $request->heating,
            "rooms" => $request->rooms,
            "bedrooms" => $request->bedrooms,
            "bathrooms" => $request->bathrooms,
            "town" => $request->town,
            "address" => $request->address,
            "postal_code" => $request->postal_code,
            "block" => $request->block,
            "floor" => $request->floor,
            "door" => $request->door,
            "lat" => $request->latlng['lat'],
            "lng" => $request->latlng['lng'],
        ]);

        $userAuth = Auth::user();
        GlobalFunctions::createLog("$userAuth->name ha creado la casa $home->title (id - $home->id)", $userAuth->id);

        return $home;
    }

    // Obtener las imágenes de una casa
    public function getImages($id)
    {
        $images = HomeImageResource::collection(HomeImage::where('home_id', $id)->get());

        $imagenes = json_decode(json_encode($images));

        foreach ($imagenes as $imagen) {
            $imagen->size = $this->humanFileSize($imagen->size);
        }
        return $imagenes;
    }

    // Insertar imágenes de una casa
    public function insertImages(Request $request, $id)
    {

        $uploadFile = $request->file('file');
        $file_name = $uploadFile->hashName();
//        Storage::disk('public')->put("/", $uploadFile);

        $imager = new Imager($uploadFile);
        // La función noise() se ha modificado directamente en el archivo vendor, si aparece un error de color no encontrado, es porque se habrá actualizado ese archivo al hacer composer update.
        $imager->flip("h")->colorize(0, 20, 40)->blur(1)->noise(5)->pixelate(1)->watermark(storage_path("/app/public/watermark.png"), 'bottom-right')->write(storage_path("/app/public/$file_name"));

        $homeImage = HomeImage::create([
            'url' => $file_name,
            'home_id' => $id
        ]);

        $imagen = [
            'url' => $file_name,
            'id' => $homeImage->id
        ];

        $userAuth = Auth::user();
        GlobalFunctions::createLog("$userAuth->name ha subido la imagen $homeImage->id", $userAuth->id);
        return $imagen;
    }

    // Borrar imágenes de una casa
    public function deleteImages($id)
    {
        $image = HomeImage::find($id);

        $userAuth = Auth::user();
        GlobalFunctions::createLog("$userAuth->name ha borrado la imagen $image->id", $userAuth->id);

        Storage::disk('public')->delete($image->url);

        $image->delete();

        return response()->json($image);
    }

    // Editar una casa
    public function updateHome(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $home = Home::find($id);
            $home->title = $request->title;
            $home->resume = $request->resume;
            $home->description = $request->description;
            $home->price = $request->price;
            $home->period_type = $request->period_type;
            $home->home_type_id = $request->home_type_id;
            $home->home_purchase_type_id = $request->home_purchase_type_id;
            $home->square_meter = $request->square_meter;
            $home->construction_year = $request->construction_year;
            $home->garage = $request->garage;
            $home->pets = $request->pets;
            $home->elevator = $request->elevator;
            $home->terrace = $request->terrace;
            $home->garden = $request->garden;
            $home->smoker = $request->smoker;
            $home->furnished = $request->furnished;
            $home->heating = $request->heating;
            $home->rooms = $request->rooms;
            $home->bedrooms = $request->bedrooms;
            $home->bathrooms = $request->bathrooms;
            $home->town = $request->town;
            $home->address = $request->address;
            $home->postal_code = $request->postal_code;
            $home->block = $request->block;
            $home->floor = $request->floor;
            $home->door = $request->door;
            if ($request->lat && $request->lng) {
                $home->lat = $request->lat;
                $home->lng = $request->lng;
            }
            $home->save();

            DB::commit();

            $userAuth = Auth::user();
            GlobalFunctions::createLog("$userAuth->name ha modificado la casa $home->title(id - $home->id)", $userAuth->id);

            $homes = GalleryResource::collection(Home::all());;
            return $homes;
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => "Hubo un error en la subida por {
                $e->getMessage()}"]);
        }
    }

    // Borrar una casa
    public function deleteHome($id)
    {
        $home = Home::find($id);

        $userAuth = Auth::user();
        GlobalFunctions::createLog("$userAuth->name ha borrado la casa $home->id", $userAuth->id);

        $imagenesHome = $home->homeImages;

        foreach ($imagenesHome as $imageHome) {
            GlobalFunctions::createLog("$userAuth->name ha eliminado la imagen {
                $imageHome->id}", $userAuth->id);
            Storage::disk('public')->delete($imageHome->url);
            $imageHome->delete();
        }

        $home->delete();

        return response()->json($home);
    }

    // Borrar varias casas
    public function deleteHomes(Request $request)
    {
        $homesID = $request->all();
        foreach ($homesID as $homeID) {
            $home = Home::find($homeID);

            $userAuth = Auth::user();
            GlobalFunctions::createLog("$userAuth->name ha borrado la casa $home->id", $userAuth->id);

            $imagenesHome = $home->homeImages;

            foreach ($imagenesHome as $imageHome) {
                GlobalFunctions::createLog("$userAuth->name ha eliminado la imagen {
                $imageHome->id}", $userAuth->id);
                Storage::disk('public')->delete($imageHome->url);
                $imageHome->delete();
            }

            $home->delete();
        }

        $homes = GalleryResource::collection(Home::all());;
        return $homes;
    }

    // Formatear el tamaño en bytes para que se pueda leer cómodamente
    private function humanFileSize($size)
    {
        if ($size >= 1073741824) {
            $fileSize = round($size / 1024 / 1024 / 1024, 1) . 'GB';
        } elseif ($size >= 1048576) {
            $fileSize = round($size / 1024 / 1024, 1) . 'MB';
        } elseif ($size >= 1024) {
            $fileSize = round($size / 1024, 1) . 'KB';
        } else {
            $fileSize = $size . ' bytes';
        }
        return $fileSize;
    }
}
