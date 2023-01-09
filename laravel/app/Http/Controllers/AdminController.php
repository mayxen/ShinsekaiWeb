<?php

namespace App\Http\Controllers;

use App\Http\Resources\GalleryResource;
use App\Models\Gallery;
use App\Models\GalleryImage;
use App\Models\LocalEvent;
use App\Models\News;
use App\Models\User;
use Dnsimmons\Imager\Imager;
use http\Exception;
use Illuminate\Http\Request;
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
            'phone_number' => $request->phone_number,
            'birthDate' => $request->birthDate,
            'address' => $request->address,
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
        $user->phone_number = $request->phone_number;
        $user->birthDate = $request->birthDate;
        $user->address = $request->address;
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
        $users = User::all();

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
                'eventDate' => $eventData->date,
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
            $event->eventDate = $eventData->date;
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
}
