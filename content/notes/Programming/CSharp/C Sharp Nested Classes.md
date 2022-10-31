---
title: "C Sharp Nested Classes"
tags: [CSharp, Unity, programming]
---

# Nested Classes

This is an example of a partial command pattern. In C# nested classes can be used as data models.



```c#
using System;
using System.Collections;
using System.Collections.Genhttps://www.youtube.com/watch?v=5N2tPBTyHO4eric;
using UnityEngine;
using UnityEngine.Events;

public class CollectEffects : MonoBehaviour
{
    [SerializeField] private GameObject targetObject;
    
    [SerializeField] private List<ParticleSystem> ParticleSystems;
    [SerializeField] private List<AnimationData> _animationsList;
    
    public enum Animations
    {
        BOUNCE,
        SHRINK,
        SPIN
    }
    //private FXTools fx;
    private Tweener twn;

    public void StartAnimation(UnityAction action)
    {
        StartCoroutine(animation((() => action?.Invoke())));
    }
    
    
    private IEnumerator animation(Action action)
    {
        
        foreach (var data in _animationsList)
        {
            foreach (var fx in data.FX) 
            {
                FXTools.RunCommand(fx);
            }
            if (!data.skip)
            {
                yield return StartCoroutine(Tween(targetObject, data));
            }
            
        }
        action?.Invoke();
    }
    private IEnumerator Tween(GameObject obj,AnimationData data)
    {
        //var 
        float elapsedTime = 0f;
        //Vector3 endScale = new Vector3(data., end, end);
        Quaternion currentRot = obj.transform.localRotation;
        Vector3 startScale = obj.transform.localScale;
        Vector3 startPosition = obj.transform.localPosition;
        var lerp = 0f;
        while (elapsedTime < data.Duration)
        {
            if (data.spinable)
            {
                transform.Rotate(0, data.spinValue * Time.deltaTime, 0);
            }
            else
            {
                obj.transform.localRotation = Quaternion.Lerp(currentRot,Quaternion.Euler(data.targetRotation), Time.deltaTime/data.Duration );
                
            }
            
            obj.transform.localPosition = Vector3.Lerp(startPosition, data.targetLocalPosition, (elapsedTime / data.Duration));
            obj.transform.localScale = Vector3.Lerp(startScale, data.targetScale, (elapsedTime / data.Duration));


            
            
            elapsedTime += Time.deltaTime;


            yield return null; // yield one frame
        }
        //action?.Invoke();
    }
    [System.Serializable]
    public class AnimationData
    {
        public Vector3 targetScale, targetRotation, targetLocalPosition;
        public float spinValue;
        public bool spinable,skip;
        public float Duration;
        public List<FXTools.FXCommand> FX;
    }
}

```

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class FXTools
{

    public enum FXCommands
    {
        BURST,
        START,
        STOP,
        DESTROY,
        PAUSE
    }
    public static void BURST(ParticleSystem s, int c)
    {
        s.Emit(c);
    }

    public static void START(ParticleSystem s)
    {
        s.Play();
    }

    public static void STOP(ParticleSystem s)
    {
        s.Stop();
    }

    public static void DESTROY(ParticleSystem s)
    {
        s.Destroy();
    }

    public static void PAUSE(ParticleSystem s)
    {
        s.Pause();
    }

    public static void RunCommand(FXCommand command)
    {
        switch (command.commands)
        {
            case FXCommands.STOP :
                STOP(command.s);
                break;
            case FXCommands.START :
                START(command.s);
                break;
            case FXCommands.BURST :
                BURST(command.s,command.value);
                break;
            case FXCommands.PAUSE :
                PAUSE(command.s);
                break;
            case FXCommands.DESTROY :
                DESTROY(command.s);
                break;
            
        }
    }

    [System.Serializable]
    public class FXCommand
    {
        public ParticleSystem s;
        public FXCommands commands;
        public int value;
    }

}
```

