import { setIsUpdatedImage, setSkinToneCode } from "@/redux/slices/boxchat";
import { RootState } from "@/redux/store";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function ImageUploader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let canvasImage: any | null;
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dispatch = useDispatch();
  const [isValidImage, setIsValidImage] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  console.log(isValidImage)

  const drawImageOnCanvas = (input: any, img: string) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const canvasElement = document.getElementById('canvas');
    const mouseMoveColor = document.getElementById('mouseMoveColor');

    if (ctx && canvas) {
      const url = input ? URL.createObjectURL(input.target.files[0]) : img;
      const image = new Image();

      if(canvasElement && url) {
          canvasElement.style.pointerEvents = "auto"
      }
      if(mouseMoveColor && url) {
        mouseMoveColor.style.display = "flex"
      }
      image.crossOrigin = "Anonymous";
      image.src = url;
      canvasImage = image;
      image.onload = function () {
        let hRatio = canvas.width / image.width,
          vRatio = canvas.height / image.height,
          ratio = Math.max(hRatio, vRatio);
        ctx.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          image.width * ratio,
          image.height * ratio
        );
      };
    }
  };

  const isUpdatedImage = useSelector((state: RootState) => state.botchat.chatControl.isUpdatedImage);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if(file) {
      handleGetImageURL(file);
    }
    drawImageOnCanvas(event, ""); // Pass the event and an empty string for img
  };
  const handleGetImageURL = async (file: File): Promise<string | null | undefined>  => {
      const CLOUD_NAME = "dy1uuo6ql";
      const UPLOAD_PRESET = "chatfashion"
      try { 
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        const responseData = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
        );
        const imageUrl = responseData.data.secure_url;
        console.log(imageUrl)
        const res = await axios.post(`https://h05xqv.buildship.run/vision?${`image_url=` + imageUrl}`,null);
        const needData = res.data;
        
        needData.objects.map((item:any) => {
          console.log(item);
          if(item.name.toLowerCase() === 'person') {
            setIsValidImage(true);
          }
          return {
            ...item,
          }
        })
      } catch (error) {
        console.error("Error uploadin image: ", error);
        return null
      }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx:any = canvas.getContext("2d");

    if (!ctx) return;
    ctxRef.current = ctx;

    trackTransforms(ctx);
		  
        const redraw = () => {
          // Clear the entire canvas
          var p1 = ctx.transformedPoint(0,0);
          var p2 = ctx.transformedPoint(canvas!.width,canvas!.height);
          ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

          ctx.save();
          ctx.setTransform(1,0,0,1,0,0);
          ctx.clearRect(0,0,canvas!.width,canvas!.height);
          ctx.restore();

          if (canvasImage instanceof HTMLImageElement && canvasImage.complete) {
            ctx.drawImage(canvasImage, 0, 0);
          }

        }
        redraw();

      let lastX=canvas.width/2, lastY=canvas.height/2;

      let dragStart:any,dragged;

      canvas.addEventListener('mousedown',(evt) => {
          lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
          lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
          dragStart = ctx.transformedPoint(lastX,lastY);
          dragged = false;
      },false);

      canvas.addEventListener('mousemove',(evt) => {
          lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
          lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
          dragged = true;
          if (dragStart){
            var pt = ctx.transformedPoint(lastX,lastY);
            ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
            redraw();
                }
      },false);

      canvas.addEventListener('mouseup', (evt) => {
          dragStart = null;
        //   if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
      },false);

      var scaleFactor = 1.1;

      var zoom = (clicks: number) => {
          var pt = ctx.transformedPoint(lastX,lastY);
          ctx.translate(pt.x,pt.y);
          var factor = Math.pow(scaleFactor,clicks);
          ctx.scale(factor,factor);
          ctx.translate(-pt.x,-pt.y);
          redraw();
      }

      var handleScroll = (evt:any) => {
          var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
          if (delta) zoom(delta);
          return evt.preventDefault() && false;
      };
    
      canvas.addEventListener('',handleScroll,false);
      canvas.addEventListener('mousewheel',handleScroll,false);
  }, [canvasImage]) 

  const trackTransforms = (ctx:any) => {
  var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
  var xform = svg.createSVGMatrix();
  ctx.getTransform = () => { return xform; };

  var savedTransforms:any = [];
  var save = ctx.save;
  ctx.save = () => {
      savedTransforms.push(xform.translate(0,0));
      return save.call(ctx);
  };

  var restore = ctx.restore;
  ctx.restore = () => {
    xform = savedTransforms.pop();
    return restore.call(ctx);
      };

  var scale = ctx.scale;
  ctx.scale = (sx:number,sy:number) => {
    xform = xform.scaleNonUniform(sx,sy)
    return scale.call(ctx,sx,sy);
      };

  var rotate = ctx.rotate;
  ctx.rotate = (radians:number) => {
      xform = xform.rotate(radians*180/Math.PI);
      return rotate.call(ctx,radians);
  };

  var translate = ctx.translate;
  ctx.translate = (dx:number,dy:number) => {
      xform = xform.translate(dx,dy);
      return translate.call(ctx,dx,dy);
  };

  var transform = ctx.transform;
  ctx.transform = (a:number,b:number,c:number,d:number,e:number,f:number) => {
      var m2 = svg.createSVGMatrix();
      m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
      xform = xform.multiply(m2);
      return transform.call(ctx,a,b,c,d,e,f);
  };

  var setTransform = ctx.setTransform;
  ctx.setTransform = (a:number,b:number,c:number,d:number,e:number,f:number) => {
      xform.a = a;
      xform.b = b;
      xform.c = c;
      xform.d = d;
      xform.e = e;
      xform.f = f;
      return setTransform.call(ctx,a,b,c,d,e,f);
  };

  var pt  = svg.createSVGPoint();
  ctx.transformedPoint = (x:number,y:number) => {
      pt.x=x; pt.y=y;
      return pt.matrixTransform(xform.inverse());
  }
}
const handleGetColorMouseMove = (evt: React.MouseEvent<HTMLCanvasElement>) => {
  let hex = extractColor(evt);
  const currentColor = document.getElementById('currentColor'); 
  if(currentColor) {
    currentColor.style.backgroundColor = hex!;
  }
}
const skinCode = useSelector((state:RootState) => state.botchat.userPick);
const handleGetColorOnBlClick = (evt: React.MouseEvent<HTMLCanvasElement>) => {
  let hex = extractColor(evt);
  if(hex) {
        dispatch(setSkinToneCode(hex));
  }
}
const handleOnClickCanvas = () => {
  dispatch(setIsUpdatedImage(true));
}
const extractColor = (evt: React.MouseEvent<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const x = evt.nativeEvent.offsetX;
  const y = evt.nativeEvent.offsetY;

  if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) {
    return ''; // Return empty string or handle invalid coordinates here
  }

  const imageData = ctx.getImageData(x, y, 1, 1);
  const [r, g, b] = imageData.data;
  const rgb = `rgb(${r}, ${g}, ${b})`;
  
  return RGBToHex(rgb);
};
const RGBToHex = (color:any) => {
  let sep = color.indexOf(",") > -1 ? "," : " ";
  color = color.substr(4).split(")")[0].split(sep);
  let r = (+color[0]).toString(16),
  g = (+color[1]).toString(16),
  b = (+color[2]).toString(16);

  if (r.length == 1)
  r = "0" + r;
  if (g.length == 1)
  g = "0" + g;
  if (b.length == 1)
  b = "0" + b;
  return "#" + r + g + b;
}

  return (
    <div className="ml-[60px] w-[800px] h-fit animate-fade-up animate-delay-300">
      <canvas
        ref={canvasRef}
        id="canvas"
        height={"600px"}
        width={"500px"}
        className="rounded-md bg-slate-100 dark:bg-[#1f2c437c] cursor-crosshair pointer-events-none"
        onMouseMove={(e) => handleGetColorMouseMove(e)}
        onDoubleClick={(e) => handleGetColorOnBlClick(e)}
        onClick={handleOnClickCanvas}
      ></canvas>

      <div className=" flex w-[500px] flex-row justify-between mt-[10px]">
        <div className="">
          <label htmlFor="inputImage">
            <div className="py-[12px] px-[14px] bg-[#043875] dark:bg-[#cbd5e1] dark:text-primaryBlack rounded-md text-white font-semibold">
              Upload Image
            </div>
          </label>
          <input
            type="file"
            id="inputImage"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
        <div className="flex-row items-center gap-[10px] dark:text-white hidden" id="mouseMoveColor">
          <p>Current color:</p>
          <div className="w-[50px] h-[50px] rounded-md"
            id="currentColor"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ImageUploader;
