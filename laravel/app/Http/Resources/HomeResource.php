<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HomeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'user_name' => $this->user->name,
            "title" => $this->title,
            "resume" => $this->resume,
            "description" => $this->description,
            "price" => $this->price,
            "period_type" => $this->period_type,
            'home_type' => $this->homeType->type,
            'home_type_id' => $this->home_type_id,
            "purchase_type" => $this->homePurchaseType->type,
            "home_purchase_type_id" => $this->home_purchase_type_id,
            "square_meter" => $this->square_meter,
            "construction_year" => $this->construction_year,
            "garage" => $this->garage,
            "pets" => $this->pets,
            "elevator" => $this->elevator,
            "terrace" => $this->terrace,
            "garden" => $this->garden,
            "smoker" => $this->smoker,
            "furnished" => $this->furnished,
            "heating" => $this->heating,
            "rooms" => $this->rooms,
            "bedrooms" => $this->bedrooms,
            "bathrooms" => $this->bathrooms,
            "town" => $this->town,
            "address" => $this->address,
            "postal_code" => $this->postal_code,
            "block" => $this->block,
            "floor" => $this->floor,
            "door" => $this->door,
            "images" => $this->homeImages->shuffle(),
            "phoneNumber" => $this->user->phone_number,
            "lat" => $this->lat,
            "lng" => $this->lng,
        ];
    }
}
